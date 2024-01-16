import React, { useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { Autocomplete, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { usePurchaseItems } from "../../hooks/PurchaseItems";
import ParametersPurchaseStock from "../ParametersPurchaseStock";
import { getStockSuggestion } from "../../redux/reducers/SearchSuggestionsReducer/actions";

import "./index.scss";

const StockSelector = ({
  suggestedStocks,
  onSelectStock,
  handleSearchChanged,
  stockName,
}) => {
  return (
    <Autocomplete
      options={suggestedStocks}
      getOptionLabel={(stock) => stock}
      onChange={(event, value) => onSelectStock(value)}
      value={stockName}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search and select an stock..."
          variant="outlined"
          onChange={(e) => handleSearchChanged(e.target.value)}
        />
      )}
    />
  );
};

const StockModal = ({
  portfolioName,
  isModalOpen,
  setModalOpen,
  saveCallback = _.noop,
}) => {
  const {
    purchaseItemsProperties,
    handlePriceChange,
    handleDateChange,
    handleQuantityChange,
    addPurchaseItem,
    removePurchaseItem,
    clearAllPurchaseItems,
  } = usePurchaseItems();

  const [stockName, setStockName] = useState("");
  const [suggestedStocks, setSuggestedStocks] = useState([]);
  const dispatch = useDispatch();

  const onSearchSuggestionsReceived = (res) => {
    const suggestedStocks = res?.data.map((stockInfo) => stockInfo.symbol);
    setSuggestedStocks(suggestedStocks);
  };

  const dispatchGetStockSuggestion = (stockName) => {
    dispatch(getStockSuggestion(stockName, onSearchSuggestionsReceived));
  };

  const debouncedSearch = React.useMemo(
    () => _.debounce(dispatchGetStockSuggestion, 600),
    []
  );

  const clearAll = () => {
    clearAllPurchaseItems();
    setStockName("");
    setSuggestedStocks([]);
  };

  const onCancelButtonClicked = () => {
    clearAll();
    setModalOpen(false);
  };

  const onSaveButtonClicked = () => {
    saveCallback(stockName, purchaseItemsProperties);
    onCancelButtonClicked();
  };

  const saveAndAddAnotherOnClick = () => {
    saveCallback(stockName, purchaseItemsProperties);
    clearAll();
  };

  const btnOperationStock = {
    nameList: ["Cancel", "Save & add another", "Save"],
    className: "stock-btn",
    variantList: ["text", "contained", "contained"],
    onClickList: [
      onCancelButtonClicked,
      saveAndAddAnotherOnClick,
      onSaveButtonClicked,
    ],
  };

  const btnOperationStockList = btnOperationStock?.nameList.map(
    (name, index) => {
      return (
        <Button
          key={index}
          className={btnOperationStock.className}
          variant={btnOperationStock.variantList[index]}
          onClick={btnOperationStock.onClickList[index]}
        >
          {name}
        </Button>
      );
    }
  );

  const onCloseClickModal = () => {
    clearAll();
    setModalOpen(false);
  };

  const purchaseItems = Object.entries(purchaseItemsProperties).map(
    ([
      id,
      {
        quantity,
        date,
        exchange,
        purchase_price: price,
        purchase_currency: purchaseCurrency,
        origin_currency: originCurrency,
        portfolio_id: portfolioId,
      },
    ]) => (
      <ParametersPurchaseStock
        key={`purchase_item_${id}`}
        onRemoveClicked={() => removePurchaseItem(id)}
        quantity={quantity}
        price={price}
        date={date}
        originCurrency={originCurrency}
        purchaseCurrency={purchaseCurrency}
        exchange={exchange}
        portfolioId={portfolioId}
        handlePriceChange={(newPrice) => handlePriceChange(id, newPrice)}
        handleQuantityChange={(newQuantity) =>
          handleQuantityChange(id, newQuantity)
        }
        handleDateChange={(newDate) => handleDateChange(id, newDate)}
      />
    )
  );

  const handleStockChanged = (stockName) => {
    setStockName(stockName);

    if (purchaseItems.length === 0) {
      addPurchaseItem();
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onCloseClickModal}>
      <Box className="box-modal">
        <div className="box-content">
          <h2 className="title-modal">
            Add stocks to {portfolioName} portfolio
          </h2>
          <StockSelector
            suggestedStocks={suggestedStocks}
            onSelectStock={handleStockChanged}
            handleSearchChanged={debouncedSearch}
            stockName={stockName}
          />

          {purchaseItems}

          {stockName ? (
            <div className="add-purchase">
              <Button
                className="add-btn-purchase-stock"
                onClick={addPurchaseItem}
              >
                <AddIcon />
              </Button>
              <span className="span-name-stock">
                More purchases of {stockName}
              </span>
            </div>
          ) : null}
          <div className="stock-group-btn">{btnOperationStockList}</div>
        </div>
      </Box>
    </Modal>
  );
};

export default StockModal;
