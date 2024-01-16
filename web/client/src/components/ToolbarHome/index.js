import Typography from "@mui/material/Typography";
import AddPortfolio from "../AddPortfolio";

import "./index.scss";

const ToolbarHome = ({
  onSavePortfolioClicked,
  toolbarError,
  portfolioName,
  isModalOpen,
  handleOpen,
  handleClose,
  setPortfolioName,
}) => {
  return (
    <div className="toolbar-home">
      <Typography
        className="portfolio-list-title"
        variant="h4"
        gutterBottom
        component="div"
      >
        Your portfolio list
      </Typography>
      <AddPortfolio
        onAddPortfolioClicked={onSavePortfolioClicked}
        toolbarError={toolbarError}
        portfolioName={portfolioName}
        setPortfolioName={setPortfolioName}
        isModalOpen={isModalOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ToolbarHome;
