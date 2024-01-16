import { API_METHOD_GET } from "../../middleware/apiMiddleware/constants";
import { FETCH_PORTFOLIO_ANALYSIS } from "../../../constants/api";
import { createApiRequestAction } from "../../middleware/apiMiddleware/actions";
import { SET_PORTFOLIO_ANALYSIS_ACTION } from "./constants";

export function getPortfolioAnalysis(portfolioId) {
  return createApiRequestAction({
    method: API_METHOD_GET,
    url: FETCH_PORTFOLIO_ANALYSIS(portfolioId),
    onSuccess: (response) => onGetPortfolioAnalysis(portfolioId, response.data),
    onError: (e) => {
      console.error(e);
    },
    shouldDispatch: true,
  });
}

export function onGetPortfolioAnalysis(portfolioId, data) {
  return {
    type: SET_PORTFOLIO_ANALYSIS_ACTION,
    payload: { portfolioId, data },
  };
}
