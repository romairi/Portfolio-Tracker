import Immutable from "seamless-immutable";
import _ from "lodash";
import { SET_PORTFOLIO_ANALYSIS_ACTION } from "./constants";

export default function portfolioStatisticsReducer(state = Immutable({}), action) {
  let newState;

  switch (action.type) {
    case SET_PORTFOLIO_ANALYSIS_ACTION: {
      const { portfolioId, data } = action.payload;
      newState = Immutable({ ...state, [portfolioId]: data });
      break;
    }
    default:
      newState = state;
  }
  return newState;
}
