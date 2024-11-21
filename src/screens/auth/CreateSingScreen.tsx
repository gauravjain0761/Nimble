import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {Icons} from '../../assets';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {useRoute} from '@react-navigation/native';
import {PrimaryButton} from '../../components/common';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';

const CreateSingScreen = () => {
  const {params} = useRoute();
  return (
    <SafeAreaView style={[AppStyles.flex, styles.container]}>
      <View style={styles.logo_container}>
        <Image source={Icons.logo} style={styles.logo} resizeMode="contain" />
        <Image
          source={Icons.createapp}
          resizeMode="contain"
          style={styles.location}
        />
        <Text style={styles.content}>
          {'Create an account to complete your check out.'}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          type="fill"
          title="Sign Up Now"
          onPress={() => {
            navigationRef.navigate(screenName.EmailScreen);
          }}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateSingScreen;

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
    ...commonFontStyle(600, 20, colors.black),
    textAlign: 'center',
    paddingHorizontal: wp(61),
    marginTop: hp(10),
  },
  location: {
    width: '100%',
    height: hp(163),
    marginTop: hp(40),
  },
  buttonContainer: {
    alignSelf: 'center',
    gap: hp(16),
    marginBottom: hp(38),
  },
  button: {
    paddingHorizontal: wp(56),
  },
});
