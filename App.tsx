import {LogBox, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux';
import RootContainer from './src/navigation/mainNavigator';
import SplashScreen from 'react-native-splash-screen';

type Props = {};

LogBox.ignoreAllLogs();
const App = (props: Props) => {
  useEffect(() => {
    //SplashScreen hide
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <RootContainer />
      </View>
    </Provider>
  );
};

export default App;
