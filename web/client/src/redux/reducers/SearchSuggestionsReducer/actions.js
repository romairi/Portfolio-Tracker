import _ from 'lodash';
import { GET_SEARCH_SUGGESTION_URL } from '../../../constants/api';
import { createApiRequestAction } from '../../middleware/apiMiddleware/actions';


export function getStockSuggestion(currentSearch, onSuccess = _.noop, onError = _.noop) {
    return createApiRequestAction({
      url: GET_SEARCH_SUGGESTION_URL(currentSearch),
      params: {
        limit: 10
      },
      shouldDispatch: false,
      onSuccess,
      onError,
    });
  }