import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { LOGIN_ROUTE, BASE_ROUTE } from "../Router/constants";
import {
  createSetUserAction,
  logoutAction,
} from "../../redux/reducers/UserReducer/actions";

import "./index.scss";
import { buildClassName } from "../../services/buildClassName";

function NavigationBar({ currentLocation }) {
  return (
    <Link
      className={buildClassName([
        "header-link",
        currentLocation === BASE_ROUTE && "selected",
      ])}
      color="inherit"
      to={BASE_ROUTE}
    >
      Home
    </Link>
  );
}

export default function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let history = createBrowserHistory();
  let location = history.location.pathname;

  const buttonTitle = _.isEmpty(user) ? "" : "Logout";

  const handleLogout = () => {
    dispatch(createSetUserAction(null));
    dispatch(navigate(LOGIN_ROUTE));
  };

  function handleButtonClick() {
    if (_.isEmpty(user)) {
      dispatch(navigate(LOGIN_ROUTE));
    } else {
      dispatch(
        logoutAction({
          onSuccess: handleLogout,
          onError: (err) => console.log(err),
        })
      );
    }
  }

  const showMenu = _.isEmpty(user) ? null : (
    <NavigationBar currentLocation={location} />
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div className="header-group-buttons">
              {showMenu}
              <Link
                className="header-link"
                color="inherit"
                to={LOGIN_ROUTE}
                onClick={handleButtonClick}
              >
                {buttonTitle}
              </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
