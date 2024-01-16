import _ from "lodash";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { buildClassName } from "../../services/buildClassName";

import "./index.scss";

const PortfolioItem = ({
  className,
  onClick,
  children,
  onRemovePortfolioItemClicked,
}) => {
  return (
    <Card className="portfolio-card">
      <CardContent className="portfolio-card-content">
        <Typography className="portfolio-card-title" variant="h5" component="div">
          {children}
        </Typography>
      </CardContent>
      <CardActions className="portfolio-card-actions">
        <Button
          className={buildClassName(["portfolio-item-btn", className])}
          variant="outlined"
          onClick={onClick}
        >
          View More
        </Button>
        <Button
          className="remove-portfolio-btn"
          onClick={onRemovePortfolioItemClicked}
        >
          <DeleteIcon className="remove-portfolio-icon" />
        </Button>
      </CardActions>
    </Card>
  );
};

PortfolioItem.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

PortfolioItem.defaultProps = {
  className: null,
  onClick: _.noop,
  children: null,
};

export default PortfolioItem;
