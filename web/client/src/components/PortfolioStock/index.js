import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from '@mui/icons-material/Add';
import StocksTable from "../StocksTable";
import StockModal from "../StockModal";

import "./index.scss";

const StockInvestment = ({
  portfolioName,
  stocks,
  isModalOpen,
  setModalOpen,
  addStock,
  saveButtonClicked,
  removeStockClicked,
  removeTransactionClicked,
  className,
}) => {
  return (
    <div className={className}>
      <div className="portfolio-stock-header">
        <h3 className="portfolio-stock-title">
          Stocks: {Object.values(stocks)?.length} items
        </h3>
        <Button color="primary" className="add-stock-btn" onClick={addStock}>
          <AddCircleIcon className="add-stock-icon" />
        </Button>
      </div>
      <StockModal
        portfolioName={portfolioName}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        saveCallback={saveButtonClicked}
      />
      <StocksTable
        stocks={stocks}
        removeStockCallback={removeStockClicked}
        removeTransactionCallback={removeTransactionClicked}
      />
    </div>
  );
};

const StockNewInvestment = ({
  portfolioName,
  stocks,
  isModalOpen,
  setModalOpen,
  addStock,
  saveButtonClicked,
  className,
}) => {
  return (
    <div className={className}>
      <div className="portfolio-stock-content">
        <div className="portfolio-stock-name">
          Portfolio name is&nbsp;  <b>{portfolioName}</b>
        </div>
        <div className="portfolio-stock-heading">
            Nothing in this portfolio yet
        </div>
        <div className="portfolio-stock-note">
            Add investments to see performance and track returns
        </div>
        <Button color="primary" className="new-add-stock-btn" onClick={addStock}>
          <AddIcon className="new-add-stock-icon"/>
          <span className="new-investment-btn-name">Add investments</span>
        </Button>
      </div>
      <StockModal
        portfolioName={portfolioName}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        saveCallback={saveButtonClicked}
      />
    </div>
  );
};

const PortfolioStock = ({
  portfolioName,
  stocks,
  isModalOpen,
  setModalOpen,
  addStock,
  saveButtonClicked,
  removeStockClicked,
  removeTransactionClicked,
}) => {
  return (
    <>
      {stocks.length === 0 ? (
        <StockNewInvestment
          portfolioName={portfolioName}
          stocks={stocks}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          addStock={addStock}
          saveButtonClicked={saveButtonClicked}
          removeStockClicked={removeStockClicked}
          removeTransactionClicked={removeTransactionClicked}
          className={"portfolio-stock-empty"}
        />
      ) : (
        <>
          <StockInvestment
            portfolioName={portfolioName}
            stocks={stocks}
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            addStock={addStock}
            saveButtonClicked={saveButtonClicked}
            removeStockClicked={removeStockClicked}
            removeTransactionClicked={removeTransactionClicked}
            className={"portfolio-stock"}
          />
        </>
      )}
    </>
  );
};

export default PortfolioStock;
