import _ from "lodash";
import PropTypes from "prop-types";
import PortfolioItem from "../PortfolioItem";

import "./index.scss";

const PortfolioList = ({
  portfolioItems,
  onPortfolioItemClicked,
  onRemovePortfolioItemClicked,
}) => {
  const portfolioItemsComponents = portfolioItems.map(
    (portfolioItem) => (
      <PortfolioItem
        // eslint-disable-next-line react/no-array-index-key
        key={`portfolio-item-${portfolioItem.id}`}
        onClick={() => onPortfolioItemClicked(portfolioItem)}
        onRemovePortfolioItemClicked={() => onRemovePortfolioItemClicked(portfolioItem.id)}
      >
        {portfolioItem.name}
      </PortfolioItem>
    )
  );

  return (
      <div className="portfolio-items">
        {portfolioItemsComponents}
      </div>
  );
};

PortfolioList.propTypes = {
  portfolioItems: PropTypes.array,
  onAddPortfolioClicked: PropTypes.func,
  onPortfolioItemClicked: PropTypes.func,
};

PortfolioList.defaultProps = {
  portfolioItems: [],
  onAddPortfolioClicked: _.noop,
  onPortfolioItemClicked: _.noop,
};

export default PortfolioList;
