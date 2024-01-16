import React from "react";
import _ from "lodash";
import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Home from "../Home";
import Login from "../Login";
import Registration from "../Registration";
import PortfolioPage from "../PortfolioPage";
import {
  BASE_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  PORTFOLIO_PAGE,
} from "./constants";
import ProtectedPage from "../ProtectedPage";

const ProtectedRoute = ({ user, children }) => {
  if (_.isEmpty(user)) {
    return <Navigate to={LOGIN_ROUTE} replace />;
  }

  return <ProtectedPage>{children}</ProtectedPage>;
};

const PublicRoute = ({ user, children }) => {
  if (!_.isEmpty(user)) {
    return <Navigate to={BASE_ROUTE} replace />;
  }
  return children;
};

function Router({ user }) {
  return (
    <Routes>
      <Route
        path={BASE_ROUTE}
        element={
          <ProtectedRoute user={user}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path={PORTFOLIO_PAGE}
        element={
          <ProtectedRoute user={user}>
            <PortfolioPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={LOGIN_ROUTE}
        element={
          <PublicRoute user={user}>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={SIGNUP_ROUTE}
        element={
          <PublicRoute user={user}>
            <Registration />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

Router.propTypes = {
  location: PropTypes.any,
};

Router.defaultProps = {
  location: null,
};

export default Router;
