export const SERVER_URL = "";
export const API_URL = `${SERVER_URL}/api`;

// AUTH API URLs
export const AUTH_URL = `${API_URL}/auth`;
export const LOGIN_URL = `${AUTH_URL}/login`;
export const REGISTER_URL = `${AUTH_URL}/register`;
export const AUTHENTICATE_URL = `${AUTH_URL}/authenticate`;
export const LOGOUT_PATH = `${AUTH_URL}/logout`;

// portfolios API URLs
export const PORTFOLIOS_URL = `${API_URL}/portfolios`;
export const CREATE_PORTFOLIO_URL = PORTFOLIOS_URL;
export const GET_ALL_PORTFOLIOS_URL = PORTFOLIOS_URL;
export const DELETE_PORTFOLIO_URL = (portfolioId) =>
  `${PORTFOLIOS_URL}/${portfolioId}`;
export const ADD_TRANSACTIONS_URL = (portfolioId) =>
  `${PORTFOLIOS_URL}/${portfolioId}/add_transactions`;
export const REMOVE_STOCK_URL = (portfolioId) =>
  `${PORTFOLIOS_URL}/${portfolioId}/remove_stock`;
export const REMOVE_TRANSACTION_URL = (portfolioId) =>
  `${PORTFOLIOS_URL}/${portfolioId}/remove_transaction`;

// stocks api
export const STOCKS_URL = `${API_URL}/stocks`;
export const GET_SEARCH_SUGGESTION_URL = (currentSearch) =>
  `${STOCKS_URL}/suggestions/${currentSearch}`;


// portfolio analysis api
export const FETCH_PORTFOLIO_ANALYSIS = (portfolioId) => `${PORTFOLIOS_URL}/analysis/${portfolioId}`