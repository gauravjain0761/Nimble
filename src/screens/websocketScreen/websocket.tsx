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
      console.log(
        `Emitting join_user_room with userId: 670d0e1b7fd8a344b87bedb0`,
      );
      socketInstance.emit('join_user_room', '670d0e1b7fd8a344b87bedb0');
    });

    socketInstance.on('room_joined', message => {
      console.log(message);
    });

    socketInstance.on('notification', notification => {
      Alert.alert('New notification', notification.message);
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
