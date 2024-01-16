import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import { PERCENTAGE_SIGN, DOLLAR_SIGN } from "./constants";
import { buildClassName } from "../../services/buildClassName";

import "./index.scss";

function GainLabel({ gain, percentageGain }) {
  const totalGainDisplay = `${DOLLAR_SIGN} ${gain?.toFixed(2)}`;
  const totalGainPerDisplay = `${percentageGain?.toFixed(2)} ${PERCENTAGE_SIGN}`;

  return (
    <div
      className={buildClassName([
        "gain-component",
        gain > 0 ? "positive-gain" : "negative-gain",
      ])}
    >
      <Typography variant="body2" gutterBottom component="span">
        {totalGainDisplay}
      </Typography>
      <Typography
        className="percentage-gain"
        variant="body2"
        gutterBottom
        component="span"
      >
        <ArrowRightAltIcon fontSize="small" />
        {totalGainPerDisplay}
      </Typography>
    </div>
  );
}

function TransactionItem({ transaction, onRemoveTransaction }) {
  const {
    quantity,
    date,
    current_price: currentPrice,
    total_gain: totalGain,
    total_gain_percentage: totalPercentageGain,
    purchase_price: purchasePrice,
  } = transaction;

  const currentValue = quantity * currentPrice;

  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>
        {purchasePrice.toFixed(2)} {DOLLAR_SIGN}
      </TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>
        <GainLabel gain={totalGain} percentageGain={totalPercentageGain} />
      </TableCell>
      <TableCell>
        {DOLLAR_SIGN} {currentValue.toFixed(2)}
      </TableCell>
      <TableCell>
        <IconButton onClick={onRemoveTransaction}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function TransactionsTable({ symbol, transactions = [], onRemoveClicked }) {
  const transactionItems = transactions.map((transaction, transactionIdx) => (
    <TransactionItem
      // eslint-disable-next-line react/no-array-index-key
      key={`${symbol}_transaction_${transactionIdx}`}
      transaction={transaction}
      onRemoveTransaction={() => onRemoveClicked(transaction)}
    />
  ));

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>PURCHASE DATE</TableCell>
          <TableCell>PURCHASE PRICE</TableCell>
          <TableCell>QUANTITY</TableCell>
          <TableCell>TOTAL GAIN</TableCell>
          <TableCell>VALUE</TableCell>
          <TableCell>DELETE</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{transactionItems}</TableBody>
    </Table>
  );
}

function StockTableBody({ stockData, onRemoveStock, onRemoveTransaction }) {
  const [open, setOpen] = useState(false);
  const {
    total_gain: totalGain,
    total_gain_percentage: totalPercentageGain,
    quantity,
    latest_price,
    transactions = [],
  } = stockData;
  const price = latest_price?.adj_close || 0;
  const currentValue = quantity * price;

  const handleRemoveStock = () => {
    onRemoveStock(stockData.id);
  };

  const handleRemoveTransaction = (transaction) => {
    onRemoveTransaction(transaction.id, stockData.id);

    if(stockData.transactions.length === 1) {
      setOpen(!open)
    }
  };
  
  return (
    <>
      <TableRow>
        <TableCell>{stockData?.symbol}</TableCell>
        <TableCell>{stockData?.short_name}</TableCell>
        <TableCell>
          {DOLLAR_SIGN} {price.toFixed(2)}
        </TableCell>
        <TableCell>{quantity}</TableCell>
        <TableCell>
          {DOLLAR_SIGN} {stockData?.cost?.toFixed(2)}
        </TableCell>
        <TableCell>
          <GainLabel gain={totalGain} percentageGain={totalPercentageGain} />
        </TableCell>
        <TableCell>
          {DOLLAR_SIGN} {currentValue?.toFixed(2)}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={handleRemoveStock}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Transactions
              </Typography>
              <TransactionsTable
                price={stockData?.latest_price?.adj_close || 0}
                transactions={transactions}
                symbol={stockData?.symbol}
                onRemoveClicked={handleRemoveTransaction}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function StocksTable({
  stocks = [],
  removeStockCallback,
  removeTransactionCallback,
}) {
  const [stockItems, setStockItems] = useState(stocks);

  useEffect(() => {
    setStockItems(stocks);
  }, [stocks]);

  const stockRows = stockItems.map((stock, stockIdx) => (
    <StockTableBody
      key={`stock_${stockIdx}`}
      stockData={stock}
      onRemoveStock={removeStockCallback}
      onRemoveTransaction={removeTransactionCallback}
    />
  ));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SYMBOL</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>CURRENT PRICE</TableCell>
            <TableCell>QUANTITY</TableCell>
            <TableCell>COST</TableCell>
            <TableCell>TOTAL GAIN</TableCell>
            <TableCell>VALUE</TableCell>
            <TableCell>DELETE</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>{stockRows}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default StocksTable;
