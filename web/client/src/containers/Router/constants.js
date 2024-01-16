import { generatePath } from "react-router-dom";

export const BASE_ROUTE = '/';
export const SIGNUP_ROUTE = '/signup';
export const LOGIN_ROUTE = '/login';
export const PORTFOLIO_PAGE = "/portfolio/:id";
export const getPortfolioPagePath = (id) => generatePath(PORTFOLIO_PAGE, {id});
