import { Link } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  createLoginAction,
  createSetUserAction,
} from "../../redux/reducers/UserReducer/actions";
import { SIGNUP_ROUTE } from "../Router/constants";
import { text } from "../../text/constants";
import Auth from "../Auth";

import "./index.scss";

function Login() {
  const dispatch = useDispatch();

  const onSuccess = useCallback(
    (response) => {
      dispatch(createSetUserAction(response.data));
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get("email");
      const password = data.get("password");

      dispatch(createLoginAction(email, password, onSuccess));
    },
    [dispatch, onSuccess]
  );

  return (
    <Auth className="login">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color="primary">
          {text.login.SIGN_IN}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={text.login.REMEMBER}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {text.login.SIGN_IN}
          </Button>
          <div className="login-link-box">
            <Link to={SIGNUP_ROUTE}>{text.login.DONT_HAVE_ACCOUNT}</Link>
          </div>
        </Box>
      </Box>
    </Auth>
  );
}

export default Login;
