import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Button, StyleSheet} from 'react-native';
import io from 'socket.io-client';

const WebSocketComponent = ({userId}) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  const connectSocket = () => {
    const socketInstance = io('wss://nimble-backend-services.onrender.com', {
      transports: ['websocket'],
    });

    socketInstance.on('connect', () => {
      setSocketConnected(true);
      console.log('Socket.IO connected');

      const userId = 'user_6750171390baedc8b36ce2af';
      socketInstance.emit('join_user_room', userId, response => {
        console.log('Room joined response:', response);
      });
    });

    // Handling server responses
    socketInstance.on('room_joined', message => {
      console.log('Room joined successfully:', message);
    });

    // Listening for notifications
    socketInstance.on('notification', notification => {
      console.log('Received notification:', notification);
    });

    socketInstance.on('disconnect', () => {
      setSocketConnected(false);
      console.log('Socket.IO disconnected');
    });

    setSocket(socketInstance);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setSocketConnected(false);
      console.log('Socket.IO manually disconnected');
    }
  };

  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        WebSocket Connected: {socketConnected ? 'Connected' : 'Disconnected'}
      </Text>
      <Button
        title="Connect WebSocket"
        onPress={connectSocket}
        disabled={socketConnected}
      />
      <Button
        title="Disconnect WebSocket"
        onPress={disconnectSocket}
        disabled={!socketConnected}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  status: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default WebSocketComponent;
