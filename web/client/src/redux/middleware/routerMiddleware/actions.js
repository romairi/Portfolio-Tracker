import { PUSH_ROUTE_ACTION, REPLACE_ROUTE_ACTION } from './constants';

export function createPushRouteAction(location) {
  return {
    type: PUSH_ROUTE_ACTION,
    payload: {
      location,
    },
  };
}

export function createReplaceRouteAction(location) {
  return {
    type: REPLACE_ROUTE_ACTION,
    payload: {
      location,
    },
  };
}
