import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./index.scss";

function DividendTableBody({ stockData }) {
  const annualContribution =
    (stockData?.dividends?.annual_contribution ?? 0) *
    (stockData?.quantity ?? 0);
  return (
    <>
      <TableRow>
        <TableCell align="left">{stockData?.short_name}</TableCell>
        <TableCell align="center">{stockData?.dividends?.annual_yield}%</TableCell>
        <TableCell align="center" >{annualContribution}</TableCell>
      </TableRow>
    </>
  );
}

function TransactionTable({ transactions }) { // TODO: CHECK IT
  return (
    <>
      <TableRow>
        <TableCell align="center">{transactions.quantity}</TableCell>
        <TableCell align="center">
          {transactions.purchase_price.toFixed(2)}
        </TableCell>
      </TableRow>
    </>
  );
}

const DividendsTable = ({ stocks = [] }) => {
  const companyItems = stocks.map((stock, stockIdx) => (
    <DividendTableBody key={`stock_${stockIdx}`} stockData={stock} />
  ));

  const headCells = ["COMPANY", "ANNUAL YIELD", "ANNUAL CONTRIBUTION"];
  const headRow = headCells.map((cell, cellIdx) => (
    <TableCell
      key={`cell_${cellIdx}`}
      align={cellIdx === 0 ? "left" : "center"}
    >
      {cell}
    </TableCell>
  ));

  return (
    <div className="dividends-table">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>{headRow}</TableRow>
          </TableHead>
          <TableBody>{companyItems}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DividendsTable;
