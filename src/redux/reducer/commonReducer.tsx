import {
  CHANGE_TIME,
  IS_LOADING,
  USER_ADDRESS,
  USER_DATA,
  USER_LOGIN,
} from '../actionTypes';

const initialState = {
  isLoading: false,
  isLogin: false,
  address: 'ON M5G 1Z4',
  userData: null,
  time: {
    date: 'Today',
    time: '9:00 am',
  },
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case IS_LOADING: {
      return {...state, isLoading: action.payload};
    }
    case USER_LOGIN: {
      return {...state, isLogin: action.payload};
    }
    case USER_ADDRESS: {
      return {...state, address: action.payload};
    }
    case USER_DATA: {
      return {...state, userData: action.payload};
    }
    case CHANGE_TIME: {
      return {...state, time: action.payload};
    }
    default:
      return state;
  }
}
