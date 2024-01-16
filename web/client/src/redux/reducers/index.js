import { combineReducers } from "redux";
import user from "./UserReducer";
import location from "./LocationReducer";
import portfolios from "./PortfoliosReducer";
import fetchedDataFlag from './FetchedDataFlagReducer';
import portfolioStatistics from './PortfolioStatisticsReducer'


const createRootReducer = () =>
  combineReducers({
    user,
    location,
    portfolios,
    fetchedDataFlag,
    portfolioStatistics
  });

export default createRootReducer;
