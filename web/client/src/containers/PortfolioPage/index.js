import _ from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { chartColors } from "../../constants/colors";
import StockCharts from "../../components/StockCharts";
import PortfolioStock from "../../components/PortfolioStock";
import PortfolioDivedend from "../../components/PortfolioDivedend";
import { PieChart } from "../../components/PieChart/index";
import {
  saveTransactionAction,
  deleteStockAction,
  deleteTransactionAction,
} from "../../redux/reducers/PortfoliosReducer/actions";
import { getPortfolioAnalysis } from "../../redux/reducers/PortfolioStatisticsReducer/actions";
import "./index.scss";

function PortfolioPage() {
  const { id } = useParams();
  const selectedPortfolio = useSelector((state) => state?.portfolios[id]);
  const fetchedDataFlag = useSelector((state) => state.fetchedDataFlag);
  const selectedPortfolioStatistics = useSelector(
    (state) => state?.portfolioStatistics[id]
  );
  const dispatch = useDispatch();
  const [isShowPieChart, setShowPieChart] = useState(true);
  const [isShowSectorPieChart, setShowSectorPieChart] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const textButton = isShowSectorPieChart ? "show industry" : "show sectors";

  const stocks = Object.values(selectedPortfolio?.stocks ?? {}) || [];
  const dividendStocks = stocks.filter((s) => s.dividends.annual_yield > 0);

  const maxDarknessValue = 70;
  const minDarknessValue = 20;

  const negGainStocks = stocks
    .filter((stock) => stock.total_gain < 0)
    .map((stock) => Math.abs(stock.total_gain));
  const minNegGain = Math.min(...negGainStocks);
  const maxNegGain = Math.max(...negGainStocks);

  const posGainStocks = stocks
    .filter((stock) => stock.total_gain > 0)
    .map((stock) => stock.total_gain);
  const minPosGain = Math.min(...posGainStocks);
  const maxPosGain = Math.max(...posGainStocks);

  const getPosDarknessValue = (stock) =>
    ((Math.abs(stock.total_gain.toFixed(2)) - minPosGain) /
      (maxPosGain - minPosGain)) *
      (maxDarknessValue - minDarknessValue) +
    minDarknessValue;

  const getNegDarknessValue = (stock) =>
    ((Math.abs(stock.total_gain.toFixed(2)) - minNegGain) /
      (maxNegGain - minNegGain)) *
      (maxDarknessValue - minDarknessValue) +
    minDarknessValue;

  const diversificationByCompanyData = stocks.map((stock) => ({
    id: stock?.symbol,
    label: stock?.long_name,
    value: (stock?.quantity * stock?.latest_price?.adj_close).toFixed(2),
  }));

  const contributorsToReturnsData = stocks.map((stock) => ({
    id: stock.symbol,
    label: stock.long_name,
    value: Math.abs(stock.total_gain.toFixed(2)),
    color: `hsl(${stock.total_gain > 0 ? 150 : 0}, 100%, ${
      100 -
      (stock.total_gain > 0
        ? getPosDarknessValue(stock)
        : getNegDarknessValue(stock))
    }%)`,
  }));

  const contributorsToReturnsBarData = stocks.map((stock, stockIdx) => ({
    id: stock.symbol,
    label: stock.long_name,
    value: stock.total_gain.toFixed(2),
    color: chartColors[stockIdx % chartColors.length],
  }));

  const totalValue = _.sumBy(stocks, "value");

  const sectors = _?.toPairs(
    _.mapValues(_.groupBy(selectedPortfolio?.stocks, "sector"), (stocks) =>
      _.sumBy(stocks, "value")
    )
  ).map((item) => ({
    id: item[0],
    value: ((item[1] / totalValue) * 100).toFixed(2),
    label: item[0],
  }));

  const industries = _.toPairs(
    _.mapValues(_.groupBy(selectedPortfolio?.stocks, "industry"), (stocks) =>
      _.sumBy(stocks, "value")
    )
  ).map((item) => ({
    id: item[0],
    value: ((item[1] / totalValue) * 100).toFixed(2),
    label: item[0],
  }));

  const switchChart = () => {
    setShowPieChart(!isShowPieChart);
  };

  const addStock = () => {
    setModalOpen(!isModalOpen);
  };

  const showIndustryChart = () => {
    setShowSectorPieChart(!isShowSectorPieChart);
  };

  const addTransactionsSaveButtonClicked = (
    stockName,
    purchaseItemsProperties
  ) => {
    dispatch(
      saveTransactionAction(
        id,
        stockName,
        Object.values(purchaseItemsProperties)
      )
    );
  };

  const removeStockClicked = (stockId) => {
    dispatch(deleteStockAction(id, stockId));
  };

  const removeTransactionClicked = (transactionId, stockId) => {
    dispatch(deleteTransactionAction(id, transactionId, stockId));
  };

  useEffect(() => {
    if (!selectedPortfolioStatistics) {
      dispatch(getPortfolioAnalysis(id));
    }
    console.log(selectedPortfolioStatistics);
  }, [selectedPortfolioStatistics, id, selectedPortfolio, dispatch]); // if remove selectedStatistics render one time 

  return (
    <div className="add_portfolio">
      {  (stocks.length === 0  && selectedPortfolio) ? (
        <PortfolioStock
          stocks={stocks}
          portfolioName={selectedPortfolio?.name}
          addStock={addStock}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          saveButtonClicked={addTransactionsSaveButtonClicked}
          removeStockClicked={removeStockClicked}
          removeTransactionClicked={removeTransactionClicked}
        />
      ) : (
        <>
          <div>
          </div>
          <Paper className="section">
            <PortfolioStock
              stocks={stocks}
              portfolioName={selectedPortfolio?.name}
              addStock={addStock}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              saveButtonClicked={addTransactionsSaveButtonClicked}
              removeStockClicked={removeStockClicked}
              removeTransactionClicked={removeTransactionClicked}
            />
          </Paper>
          <Paper className="section">
            <StockCharts
              diversificationByCompanyData={diversificationByCompanyData}
              switchChart={switchChart}
              pieData={contributorsToReturnsData}
              barData={contributorsToReturnsBarData}
              isCurChart={isShowPieChart}
            />
          </Paper>
          <Paper className="section">
            <div className="pie-charts-sector-industry">
              <Button
                className="show-pie-chart-btn"
                variant="contained"
                onClick={showIndustryChart}
              >
                {textButton}
              </Button>
              <div>
                {isShowSectorPieChart ? (
                  <PieChart data={sectors} />
                ) : (
                  <PieChart data={industries} />
                )}
              </div>
            </div>
          </Paper>

          <Paper className="section">
            <PortfolioDivedend
              title={selectedPortfolio?.name}
              stocks={dividendStocks}
            />
          </Paper>
        </>
      )}
    </div>
  );
}

export default PortfolioPage;
