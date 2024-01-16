import { SET_LOCATION } from "./constants";

export function createSetLocationAction(location) {
  return {
    type: SET_LOCATION,
    payload: location,
  };
}
