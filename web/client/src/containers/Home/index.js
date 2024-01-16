import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolioPagePath } from "../Router/constants";
import {
  createPortfolioAction,
  deletePortfolioAction,
} from "../../redux/reducers/PortfoliosReducer/actions";
import PortfolioList from "../../components/PortfolioList";
import ToolbarHome from "../../components/ToolbarHome";
import { useNavigate } from "react-router-dom";

import "./index.scss";

function Home() {
  const portfolioItems = useSelector((state) => state.portfolios);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
  const [toolbarError, setToolbarError] = useState(null);

  const handleOpen = () => setModalOpen(true);

  const handleClose = () => {
    setPortfolioName("");
    setModalOpen(false);
  };

  const handleToolbarError = (error) => {
    setToolbarError(error?.response?.data?.detail[0]?.msg);
  };

  const onSavePortfolioClicked = (portfolioName) => {
    dispatch(createPortfolioAction(portfolioName, handleToolbarError));

    if (portfolioName?.length > 1) {
      handleClose();
    }

    setToolbarError(null);
  };

  const onPortfolioItemClicked = (portfolioItem) => {
    navigate(getPortfolioPagePath(portfolioItem.id));
  };

  const onRemovePortfolioItemClicked = (portfolioId) => {
    dispatch(deletePortfolioAction(portfolioId));
  };

  return (
    <div className="home">
      <ToolbarHome
        onSavePortfolioClicked={onSavePortfolioClicked}
        toolbarError={toolbarError}
        portfolioName={portfolioName}
        setPortfolioName={setPortfolioName}
        isModalOpen={isModalOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <PortfolioList
        portfolioItems={Object.values(portfolioItems)}
        onPortfolioItemClicked={onPortfolioItemClicked}
        onRemovePortfolioItemClicked={onRemovePortfolioItemClicked}
      />
    </div>
  );
}

export default Home;
