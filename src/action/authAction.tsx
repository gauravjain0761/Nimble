import {IS_LOADING} from '../redux/actionTypes';
import {api, POST} from '../utils/apiConstants';
import {makeAPIRequest} from '../utils/apiGlobal';
import {setAsyncToken} from '../utils/asyncStorageManager';

export const onLogin = (request: any) => async (dispatch: any) => {
  dispatch({type: IS_LOADING, payload: true});

  return makeAPIRequest({
    method: POST,
    url: api.login,
    data: request?.data,
  })
    .then(async (response: any) => {
      if (response.status === 201 || response.status === 200) {
        setAsyncToken(response?.data?.token);
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

export const onSendOtp = (request: any) => async (dispatch: any) => {
  dispatch({type: IS_LOADING, payload: true});

  return makeAPIRequest({
    method: POST,
    url: api.send_code,
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

export const onVerifyOtp = (request: any) => async (dispatch: any) => {
  dispatch({type: IS_LOADING, payload: true});

  return makeAPIRequest({
    method: POST,
    url: api.verify_code,
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

export const onSaveName = (request: any) => async (dispatch: any) => {
  dispatch({type: IS_LOADING, payload: true});

  return makeAPIRequest({
    method: POST,
    url: api.save_name,
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

export const onSavePassword = (request: any) => async (dispatch: any) => {
  dispatch({type: IS_LOADING, payload: true});

  return makeAPIRequest({
    method: POST,
    url: api.save_password,
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
