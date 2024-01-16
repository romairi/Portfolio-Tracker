import Immutable from "seamless-immutable";

import { SET_USER_ACTION } from "./constants";

export default function userReducer(state = Immutable({}), action) {
  let newState;

  switch (action.type) {
    case SET_USER_ACTION:
      newState = Immutable({ ...action.payload });
      break;
    default:
      newState = state;
  }
  return newState;
}
