import Immutable from "seamless-immutable";
import _ from "lodash";
import {
  ADD_PORTFOLIOS_ACTION,
  ADD_TRANSACTIONS_ACTION,
  REMOVE_PORTFOLIO_ACTION,
  SET_PORTFOLIOS_ACTION,
  REMOVE_TRANSACTION_ACTION,
  REMOVE_STOCK_ACTION,
} from "./constants";

export default function portfoliosReducer(state = Immutable({}), action) {
  let newState;

  switch (action.type) {
    case SET_PORTFOLIOS_ACTION: {
      newState = Immutable(
        action.payload.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
      );
      break;
    }
    case ADD_PORTFOLIOS_ACTION: {
      newState = Immutable({ ...state, [action.payload.id]: action.payload });
      break;
    }
    case REMOVE_PORTFOLIO_ACTION: {
      const { [action.payload]: payload, ...rest } = state;
      newState = Immutable(rest);
      break;
    }
    case ADD_TRANSACTIONS_ACTION: {
      newState = Immutable({ ...state, [action.payload.id]: action.payload });
      break;
    }
    case REMOVE_STOCK_ACTION: {
      const { portfolioId, stockId } = action.payload;

      newState = Immutable({
        ...state,
        [portfolioId]: {
          ...state[portfolioId],
          stocks: _.omitBy(
            state[portfolioId].stocks,
            (stock) => stock.id === stockId
          ),
        },
      });
      break;
    }
    case REMOVE_TRANSACTION_ACTION: {
      const { portfolioId, stockId, transactionId } = action.payload;
      const stocks = state[portfolioId].stocks;
      const transactions = stocks[stockId].transactions;

      const newTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
      let newStocks = {
        ...stocks,
        [stockId]: { ...stocks[stockId], transactions: newTransactions },
      };

      if (newTransactions.length === 0) {
        // delete the stock
        newStocks = _.omitBy(newStocks, (stock) => stock.id === stockId);
      }

      newState = Immutable({
        ...state,
        [portfolioId]: {
          ...state[portfolioId],
          stocks: newStocks,
        },
      });
      break;
    }
    default:
      newState = state;
  }
  return newState;
}
