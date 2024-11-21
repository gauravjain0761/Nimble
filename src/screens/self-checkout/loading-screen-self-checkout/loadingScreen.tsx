import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../../theme/appStyles';
import {colors} from '../../../theme/colors';
import {Icons} from '../../../assets';
import {
  commonFontStyle,
  hp,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  wp,
} from '../../../theme/fonts';
import {useRoute} from '@react-navigation/native';
import {navigationRef} from '../../../navigation/mainNavigator';
import {screenName} from '../../../navigation/screenNames';

const LoadingScreenSelfCheckout = () => {
  const {params}: any = useRoute();

  console.log('Loading Screen:', params.cartItem);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigationRef.navigate(screenName.OrderConfirmationSelfCheckout, {
        cartItem: params.cartItem,
      });
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <SafeAreaView style={[AppStyles.flex, styles.container]}>
      <View style={styles.logo_container}>
        <Text style={styles.content}>{params?.headerText}</Text>
        {params.decText && <Text style={styles.decText}>{params.decText}</Text>}
        <Image
          source={Icons.experience_gif}
          resizeMode="contain"
          style={styles.location}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreenSelfCheckout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  logo: {
    width: wp(140),
    height: hp(100),
    alignSelf: 'center',
  },
  logo_container: {},
  content: {
    ...commonFontStyle(700, 24, colors.black),
    textAlign: 'center',
    paddingHorizontal: wp(61),
    marginTop: SCREEN_HEIGHT * 0.16,
  },
  decText: {
    ...commonFontStyle(400, 18, colors.black),
    textAlign: 'center',
    marginTop: hp(10),
  },
  location: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.5,
    marginTop: hp(40),
    resizeMode: 'contain',
  },
});
