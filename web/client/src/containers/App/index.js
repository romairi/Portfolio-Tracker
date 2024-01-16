import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import Router from "../Router";
import Header from "../Header";
import {
  createAuthenticateAction,
  createSetUserAction,
} from "../../redux/reducers/UserReducer/actions";
import { SpinnerContainer } from "../../components/Spinner";

import "./index.scss";

function App() {
  const [isFetching, setIsFetching] = React.useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const onAuthenticationSuccess = (response) => {
    const user = response?.data;

    if (user) {
      dispatch(createSetUserAction(user));
    }
    setIsFetching(false);
  };

  React.useEffect(() => {
    dispatch(createAuthenticateAction(onAuthenticationSuccess));
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Header user={user} />
        <div className="content">
          <SpinnerContainer isLoading={isFetching}>
            <Router user={user} />
          </SpinnerContainer>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
