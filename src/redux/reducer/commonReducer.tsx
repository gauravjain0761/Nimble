import {
  CHANGE_TIME,
  DISCONNECT_SOCKET,
  IS_LOADING,
  RECEIVE_NOTIFICATION,
  SET_SOCKET,
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
  socket: null,
  notifications: {},
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
    case SET_SOCKET:
      return {...state, socket: action.payload};
    case DISCONNECT_SOCKET:
      return {...state, socket: null};
    case RECEIVE_NOTIFICATION:
      const {recipientId, ...notificationData} = action.payload;
      return {
        ...state,
        notifications: {
          ...state.notifications,
          notificationData, // Store by recipientId
        },
      };
    default:
      return state;
  }
}
