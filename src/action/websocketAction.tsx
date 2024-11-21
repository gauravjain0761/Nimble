import io from 'socket.io-client';
import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  SOCKET_NOTIFICATION,
  IS_LOADING,
} from '../redux/actionTypes';
import {Alert} from 'react-native';

const SOCKET_URL = 'http://localhost:8800';

export const socketConnect = () => ({type: SOCKET_CONNECT});
export const socketDisconnect = () => ({type: SOCKET_DISCONNECT});
export const receiveNotification = (notification: any) => ({
  type: SOCKET_NOTIFICATION,
  payload: notification,
});

export const initiateSocketConnection = (userId, shopId) => async dispatch => {
  dispatch({type: IS_LOADING, payload: true});

  const socket = io(SOCKET_URL, {transports: ['websocket']});

  socket.on('connect', () => {
    dispatch(socketConnect());
    dispatch({type: IS_LOADING, payload: false});
    console.log('Connected to WebSocket server');

    if (userId) socket.emit('join_user_room', userId);
    if (shopId) socket.emit('join_seller_room', shopId);
  });

  socket.on('notification', notification => {
    dispatch(receiveNotification(notification));
    Alert.alert(`New notification: ${notification.message}`);
    // toast.info(`New notification: ${notification.message}`);
  });

  socket.on('disconnect', () => {
    dispatch(socketDisconnect());
    console.log('Disconnected from WebSocket server');
    dispatch(reconnectSocket(userId, shopId)); // Trigger reconnection attempt
  });

  socket.on('connect_error', error => {
    console.error('Connection error:', error);
    dispatch({type: IS_LOADING, payload: false});
  });

  socket.on('connect_timeout', () => {
    console.warn('Connection timeout');
    dispatch({type: IS_LOADING, payload: false});
  });

  return socket;
};

export const reconnectSocket = (userId, shopId) => dispatch => {
  setTimeout(() => {
    dispatch(initiateSocketConnection(userId, shopId));
  }, 5000); // Reconnect after 5 seconds
};

export const closeSocketConnection = socket => dispatch => {
  if (socket) {
    socket.disconnect();
    dispatch(socketDisconnect());
  }
};
