import { applyMiddleware, createStore } from "redux";
import { createBrowserHistory } from "history";
import createRootReducer from "./reducers";
import createMiddleware from "./middleware";

export const history = createBrowserHistory();

export default function configureStore(preloadedState = {}) {
  const store = createStore(
    createRootReducer(),
    preloadedState,
    applyMiddleware(...createMiddleware(history))
  );

  return store;
}
