import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App";
import configureStore, { history } from "./redux/configureStore";
import { createSetLocationAction } from "./redux/reducers/LocationReducer/actions";
import "./index.scss";

const store = configureStore({});
window.clientData = window.clientData || {};

store.dispatch(createSetLocationAction(history.location));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
