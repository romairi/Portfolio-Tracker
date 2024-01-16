import axios from 'axios';
import _ from 'lodash';

import { API_ACTION, API_METHOD_GET } from './constants';

const apiMiddleware = (store) => (next) => (action) => {
  if (action.type === API_ACTION) {
    const {
      method = API_METHOD_GET,
      url,
      data,
      params,
      onSuccess = _.noop,
      onError = _.noop,
      shouldDispatch = false,
    } = action.payload;
    const onSuccessCallback = shouldDispatch
      ? (response) => store.dispatch(onSuccess(response))
      : onSuccess;

    axios({
      method,
      url,
      data,
      params,
      withCredentials: true
    })
      .then(onSuccessCallback)
      .catch(onError);
  } else {
    next(action);
  }
};

export default apiMiddleware;
