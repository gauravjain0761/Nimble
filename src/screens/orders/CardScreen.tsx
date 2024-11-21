/* eslint-disable react/no-unstable-nested-components */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {Icons} from '../../assets';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {useRoute} from '@react-navigation/native';
import {Header, PrimaryButton} from '../../components/common';
import {screenName} from '../../navigation/screenNames';

const CardScreen = ({navigation}: any) => {
  const {params}: any = useRoute();

  const IconBtnText = ({icon, leftIcon, leftIconStyle, onPress}: any) => {
    return (
      <TouchableOpacity style={styles.btnView} onPress={onPress}>
        {leftIcon ? (
          <Image source={leftIcon} style={[styles.leftIcon, leftIconStyle]} />
        ) : (
          <Text style={styles.btnText}>Add New Card</Text>
        )}
        <Image source={icon} style={styles.ic_right} />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={[AppStyles.flex, styles.container]}>
      <View style={styles.logo_container}>
        <Header showLogo={true} showLeftIcon />
        <Text style={styles.content}>
          {'Add a payment method to complete your check out.'}
        </Text>
        <View style={{marginHorizontal: 28, marginTop: 40}}>
          <Text style={styles.labelText}>Credit or Debit Card</Text>
          <IconBtnText
            icon={Icons.ic_plus1}
            onPress={() => {
              navigation.navigate(screenName.AddCardScreen);
            }}
          />
        </View>
        <View style={{marginHorizontal: 28, marginTop: 40}}>
          <Text style={styles.labelText}>Others</Text>
          <IconBtnText
            icon={Icons.ic_right}
            leftIcon={Icons.pay}
            leftIconStyle={{width: 48, height: 36, resizeMode: 'cover'}}
            onPress={() => {}}
          />
          <View style={{height: 12}} />
          <IconBtnText
            icon={Icons.ic_right}
            leftIcon={Icons.paypal}
            leftIconStyle={{
              width: 85,
              height: 36,
              resizeMode: 'cover',
            }}
            onPress={() => {}}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          type="fill"
          title="Submit"
          onPress={() => {
            navigation.navigate(screenName.CheckoutScreen, {
              cartItem: params?.cartItem,
            });
          }}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

export default CardScreen;

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
    paddingHorizontal: wp(92),
  },
  btnView: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    borderColor: colors.grey_30,
    height: 52,
  },
  btnText: {
    ...commonFontStyle(600, 16, colors.black),
  },
  labelText: {
    ...commonFontStyle(600, 20, colors.black),
    marginBottom: 10,
  },
  ic_right: {
    width: 12,
    height: 12,
  },
  leftIcon: {
    width: 48,
    height: 36,
    resizeMode: 'cover',
  },
});
