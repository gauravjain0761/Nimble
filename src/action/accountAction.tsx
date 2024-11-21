import {IS_LOADING} from '../redux/actionTypes';
import {api, POST} from '../utils/apiConstants';
import {makeAPIRequest} from '../utils/apiGlobal';

export const onGetUser = (request: any) => async (dispatch: any) => {
  dispatch({type: IS_LOADING, payload: true});

  return makeAPIRequest({
    method: POST,
    url: api.get_user,
    data: request?.data,
  })
    .then(async (response: any) => {
      if (response.status === 201 || response.status === 200) {
        dispatch({type: IS_LOADING, payload: false});
        if (request.onSuccess) {
          request.onSuccess(response.data);
        }
      }
    })
    .catch((error: any) => {
      dispatch({type: IS_LOADING, payload: false});
      if (request.onFailure) {
        request.onFailure(error.response ? error.response : error);
      }
    });
};
