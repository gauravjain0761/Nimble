import {IS_LOADING} from '../redux/actionTypes';
import {api, POST} from '../utils/apiConstants';
import {makeAPIRequest} from '../utils/apiGlobal';

export const onAddCard = (request: any) => async (dispatch: any) => {
  dispatch({type: IS_LOADING, payload: true});

  return makeAPIRequest({
    method: POST,
    url: api.save_card,
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

export const onPaymentApi = (request: any) => async (dispatch: any) => {
  dispatch({type: IS_LOADING, payload: true});

  return makeAPIRequest({
    method: POST,
    url: api.payment,
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
export const onPaymentSnpApi = (request: any) => async (dispatch: any) => {
  dispatch({type: IS_LOADING, payload: true});

  return makeAPIRequest({
    method: POST,
    url: api.payment_snp,
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
