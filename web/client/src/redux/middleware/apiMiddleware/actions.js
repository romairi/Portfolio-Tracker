import _ from 'lodash';

import { API_ACTION, API_METHOD_GET } from './constants';

/**
 * @param method
 * @param url
 * @param data
 * @param params
 * @param onSuccess
 * @param onError
 */
export function createApiRequestAction({
  method = API_METHOD_GET,
  url,
  data,
  params,
  onSuccess = _.noop,
  onError = _.noop,
  shouldDispatch = false,
}) {
  return {
    type: API_ACTION,
    payload: {
      method,
      url,
      data,
      params,
      onSuccess,
      onError,
      shouldDispatch,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}
