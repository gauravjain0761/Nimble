import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {USER_LOGOUT} from './actionTypes';
import commonReducer from './reducer/commonReducer';
import productReducer from './reducer/productReducer';

const middleware = [thunk];

//add all reducer
const reducers = combineReducers({
  common: commonReducer,
  product: productReducer,
});

//empty all reducer
const rootReducer = (state: any, action: any) => {
  if (action.type === USER_LOGOUT) {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const store = configureStore({reducer: rootReducer, middleware});

export default store;
