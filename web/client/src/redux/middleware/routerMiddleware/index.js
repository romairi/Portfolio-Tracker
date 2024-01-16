import { createSetLocationAction } from "../../reducers/LocationReducer/actions";
import { PUSH_ROUTE_ACTION, REPLACE_ROUTE_ACTION } from "./constants";

const createRouterMiddleware = (history) => (store) => (next) => (action) => {
  switch (action.type) {
    case PUSH_ROUTE_ACTION:
      {
        const { location } = action.payload;
        history.push(location);
        store.dispatch(createSetLocationAction(history.location));
      }
      break;
    case REPLACE_ROUTE_ACTION:
      {
        const { location } = action.payload;
        history.replace(location);
        store.dispatch(createSetLocationAction(history.location));
      }
      break;
    default:
      next(action);
  }
};

export default createRouterMiddleware;
