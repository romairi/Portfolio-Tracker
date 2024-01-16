import Immutable from "seamless-immutable";

import { SET_LOCATION } from "./constants";

export default function locationReducer(state = Immutable({}), action) {
  let newState;

  switch (action.type) {
    case SET_LOCATION:
      newState = Immutable({ ...action.payload });
      break;

    default:
      newState = state;
  }
  return newState;
}
