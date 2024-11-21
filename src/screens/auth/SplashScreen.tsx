import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import { Icons } from '../../assets';
import { colors } from '../../theme/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../theme/fonts';
import { AppStyles } from '../../theme/appStyles';
import { screenName } from '../../navigation/screenNames';
import { getAsyncToken, getAsyncUserOnboarding } from '../../utils/asyncStorageManager';
import { dispatchNavigation } from '../../utils/globalFunctions';

type Props = {};

const SplashScreen = (props: Props) => {

  useEffect(() => {
    getUserInfo();
  }, []);

  //check user login
  const getUserInfo = async () => {
    let isUser = await getAsyncToken();
    dispatchNavigation(screenName.OnBoaring);
    // let userOnboarding = await getAsyncUserOnboarding();    
    // if (isUser) {
    //   dispatchNavigation(screenName.HomeScreen);
    // } else {
    //   if(!userOnboarding){
    //     dispatchNavigation(screenName.IntroductionScreen);
    //   }else{
    //     dispatchNavigation(screenName.SignIn);
    //   }
     
    // }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.primary}
        translucent={true}
      />
      <View style={[AppStyles.flex, styles.logo]}>
        <Image
          style={styles.mainImage}
          source={Icons.launch_screen}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles =StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  mainImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
