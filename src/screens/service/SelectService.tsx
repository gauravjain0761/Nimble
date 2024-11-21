import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {Icons} from '../../assets';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {PrimaryButton} from '../../components/common';
import {screenName} from '../../navigation/screenNames';
import {useNavigation} from '@react-navigation/native';
import {navigationRef} from '../../navigation/mainNavigator';

const SelectService = () => {
  const navigation = useNavigation();

  const onPressButton = (option: string) => {
    navigation.navigate(screenName.LocationScreen, {option: option});
  };

  return (
    <SafeAreaView style={[AppStyles.flex, styles.container]}>
      <View style={styles.logo_container}>
        <Image source={Icons.logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.content}>
          {'Welcome! What do you need help with your grocery today?'}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          type="outline"
          title="Order & Pick up"
          onPress={() => onPressButton('Order & Pick up')}
          style={styles.button}
        />
        <PrimaryButton
          type="outline"
          title="Self Check-out"
          onPress={() => onPressButton('Self Check-out')}
          style={styles.button}
        />
        <PrimaryButton
          type="outline"
          title="To WebSocket Page"
          onPress={() => navigationRef.navigate(screenName.Websocket)}
          style={styles.button}
        />
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>{'Already have an account?'}</Text>
          <Text
            onPress={() => {
              navigation.navigate(screenName.LoginScreen);
            }}
            style={styles.createText}>
            {'Sign in'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectService;

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
    marginTop: hp(126),
  },
  buttonContainer: {
    alignSelf: 'center',
    gap: hp(16),
    marginBottom: hp(38),
  },
  button: {
    paddingHorizontal: wp(56),
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(20),
  },
  signUpText: {
    ...commonFontStyle(400, 16, colors.secondaryPrimary),
  },
  createText: {
    ...commonFontStyle(600, 16, colors.secondaryPrimary),
    marginLeft: wp(5),
  },
});
