import {
  ADD_PORTFOLIOS_ACTION,
  ADD_TRANSACTIONS_ACTION,
  REMOVE_PORTFOLIO_ACTION,
  SET_PORTFOLIOS_ACTION,
  REMOVE_TRANSACTION_ACTION,
  REMOVE_STOCK_ACTION,
} from "./constants";
import { createApiRequestAction } from "../../middleware/apiMiddleware/actions";
import {
  API_METHOD_DELETE,
  API_METHOD_GET,
  API_METHOD_POST,
} from "../../middleware/apiMiddleware/constants";
import {
  ADD_TRANSACTIONS_URL,
  CREATE_PORTFOLIO_URL,
  DELETE_PORTFOLIO_URL,
  GET_ALL_PORTFOLIOS_URL,
  REMOVE_STOCK_URL,
  REMOVE_TRANSACTION_URL,
} from "../../../constants/api";

export function createSetPortfoliosAction(portfolios) {
  return {
    type: SET_PORTFOLIOS_ACTION,
    payload: portfolios,
  };
}

export function createPortfolioAction(portfolioName, onError = console.error) {
  return createApiRequestAction({
    method: API_METHOD_POST,
    url: CREATE_PORTFOLIO_URL,
    data: {
      name: portfolioName,
    },
    onSuccess: (response) => {
      return addPortfolioAction(response.data);
    },
    onError,
    shouldDispatch: true,
  });
}

export function addPortfolioAction(portfolio) {
  return {
    type: ADD_PORTFOLIOS_ACTION,
    payload: portfolio,
  };
}

export function getAllPortfoliosAction() {
  return createApiRequestAction({
    method: API_METHOD_GET,
    url: GET_ALL_PORTFOLIOS_URL,
    onSuccess: (response) => createSetPortfoliosAction(response.data),
    onError: (e) => {
      console.error(e);
    },
    shouldDispatch: true,
  });
}

export function removePortfolioAction(portfolioId) {
  return {
    type: REMOVE_PORTFOLIO_ACTION,
    payload: portfolioId,
  };
}

export function deletePortfolioAction(portfolioId) {
  return createApiRequestAction({
    method: API_METHOD_DELETE,
    url: DELETE_PORTFOLIO_URL(portfolioId),
    onSuccess: () => removePortfolioAction(portfolioId),
    onError: (e) => {
      console.error(e);
    },
    shouldDispatch: true,
  });
}

export function saveTransactionAction(
  portfolioId,
  stockName,
  transactionData,
  onError = console.error
) {
  return createApiRequestAction({
    method: API_METHOD_POST,
    url: ADD_TRANSACTIONS_URL(portfolioId),
    data: {
      stock_name: stockName,
      transactions: transactionData,
    },
    onSuccess: (response) => {
      return addTransactionAction(response.data);
    },
    onError,
    shouldDispatch: true,
  });
}

export function addTransactionAction(transaction) {
  return {
    type: ADD_TRANSACTIONS_ACTION,
    payload: transaction,
  };
}

export function onDeleteStockSucceededAction(portfolioId, stockId) {
  return {
    type: REMOVE_STOCK_ACTION,
    payload: { portfolioId, stockId },
  };
}

export function deleteStockAction(portfolioId, stockId) {
  return createApiRequestAction({
    method: API_METHOD_DELETE,
    url: REMOVE_STOCK_URL(portfolioId),
    params: {
      stock_id: stockId,
    },
    onSuccess: () => {
      return onDeleteStockSucceededAction(portfolioId, stockId);
    },
    onError: (e) => {
      console.error(e);
    },
    shouldDispatch: true,
  });
}

export function onDeleteTransactionSucceededAction(
  portfolioId,
  transactionId,
  stockId
) {
  return {
    type: REMOVE_TRANSACTION_ACTION,
    payload: { portfolioId, transactionId, stockId },
  };
}

export function deleteTransactionAction(portfolioId, transactionId, stockId) {
  return createApiRequestAction({
    method: API_METHOD_DELETE,
    url: REMOVE_TRANSACTION_URL(portfolioId),
    params: {
      transaction_id: transactionId,
    },
    onSuccess: () => {
      return onDeleteTransactionSucceededAction(
        portfolioId,
        transactionId,
        stockId
      );
    },
    onError: (e) => {
      console.error(e);
    },
    shouldDispatch: true,
  });
}