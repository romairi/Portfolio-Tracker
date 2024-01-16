import _ from "lodash";
import { createApiRequestAction } from "../../middleware/apiMiddleware/actions";
import { API_METHOD_GET, API_METHOD_POST } from "../../middleware/apiMiddleware/constants";
import { SET_USER_ACTION } from "./constants";
import {
  AUTHENTICATE_URL,
  LOGIN_URL,
  LOGOUT_PATH,
  REGISTER_URL,
} from "../../../constants/api";

export function createSetUserAction(user) {
  return {
    type: SET_USER_ACTION,
    payload: user,
  };
}

export function createAuthenticateAction(onSuccess = _.noop, onError = _.noop) {
  return createApiRequestAction({
    url: AUTHENTICATE_URL,
    shouldDispatch: true,
    onSuccess,
    onError,
  });
}

export function createLoginAction(
  email,
  password,
  onSuccess = _.noop,
  onError = _.noop
) {
  return createApiRequestAction({
    method: API_METHOD_POST,
    url: LOGIN_URL,
    data: {
      email,
      password,
    },
    onSuccess,
    onError,
  });
}

export function registrationAction({
  data,
  onSuccess = _.noop,
  onError = _.noop,
}) {
  return createApiRequestAction({
    method: API_METHOD_POST,
    url: REGISTER_URL,
    data,
    onSuccess,
    onError,
  });
}

export function logoutAction({ onSuccess = _.noop, onError = _.noop }) {
  return createApiRequestAction({
    method: API_METHOD_GET,
    url: LOGOUT_PATH,
    onSuccess,
    onError,
  });
}
