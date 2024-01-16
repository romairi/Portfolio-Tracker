import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LOGIN_ROUTE } from "../Router/constants";
import { text } from "../../text/constants";
import {
  createSetUserAction,
  registrationAction,
} from "../../redux/reducers/UserReducer/actions";
import { schemaRegistration } from "./validation";
import Auth from "../Auth";

import "./index.scss";

function Error({ message }) {
  return message ? <p className="server-error">{message}</p> : null;
}

function Registration() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schemaRegistration),
  });

  const onSuccess = useCallback(
    (response) => {
      dispatch(createSetUserAction(response.data));
    },
    [dispatch]
  );

  const onSubmit = useCallback(
    (values, handleServerError) => {
      dispatch(
        registrationAction({
          data: values,
          onSuccess,
          onError: handleServerError,
        })
      );
    },
    [dispatch, onSuccess]
  );

  return (
    <Auth className="registration">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color="primary">
          {text.registration.SIGN_UP}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                {...register("username")}
              />
              <Error message={errors.email?.message} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email")}
              />
              <Error message={errors.email?.message} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                {...register("password")}
              />
              <Error message={errors.password?.message} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
                {...register("confirmPassword")}
              />
              <Error message={errors.confirmPassword?.message} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {text.registration.SIGN_UP}
          </Button>
          <div className="register-link-box">
            <Link to={LOGIN_ROUTE} variant="body2">
              {text.registration.DONT_HAVE_ACCOUNT}
            </Link>
          </div>
        </Box>
      </Box>
    </Auth>
  );
}

export default Registration;
