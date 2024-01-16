import {
  SET_PORTFOLIOS_ACTION,
} from "../PortfoliosReducer/constants";

export default function fetchedDataFlagReducer(state = false, action) {
  let newState;

  switch (action.type) {
    case SET_PORTFOLIOS_ACTION:
      newState = true;
      break;

    default:
      newState = state;
  }
  return newState;
}
