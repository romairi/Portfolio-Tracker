import _ from "lodash";
import DividendsTable from "../DividendsTable";

import "./index.scss";

const PortfolioDivedend = ({ stocks }) => {
  const totalDividends = _.sum(
    stocks.map(
      (stock) =>
        (stock?.dividends?.annual_contribution ?? 0) * (stock?.quantity ?? 0)
    )
  );

  return (
    <div className="portfolio-divedend">
      <h3 className="portfolio-divedend-title">Dividends</h3>
      <p className="portfolio-divedend-sub-title">
        The total annual dividends contributions is {totalDividends}$
      </p>
      <h4 className="portfolio-divedend-sub-title">Top payers</h4>

      <DividendsTable stocks={stocks} />
    </div>
  );
};

export default PortfolioDivedend;
