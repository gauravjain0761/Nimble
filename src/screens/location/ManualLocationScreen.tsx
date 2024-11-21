import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {Icons} from '../../assets';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {Header, Input, PrimaryButton} from '../../components/common';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';
import {addressList} from '../../utils/dummyData';
import {infoToast} from '../../utils/commonFunction';
import {useAppDispatch} from '../../redux/hooks';
import {USER_ADDRESS} from '../../redux/actionTypes';
import {useKeyboard} from '../../utils/useKeyboard';

const ManualLocationScreen = () => {
  const [valueText, setValueText] = useState('');
  const {params} = useRoute();

  const dispatch = useAppDispatch();
  const {keyboardVisible} = useKeyboard();

  const onSubmit = () => {
    if (valueText === '') {
      infoToast('Please enter your address');
      return;
    } else if (!addressList.some(item => item.value === valueText)) {
      infoToast('Please enter correct address');
      return;
    }
    dispatch({
      type: USER_ADDRESS,
      payload: valueText,
    });
    navigationRef.navigate(screenName.LoadingScreen, {
      headerText: 'Bringing you the best grocery shopping experience...',
    });
  };
  return (
    <SafeAreaView style={[AppStyles.flex, styles.container]}>
      <View style={styles.logo_container}>
        <Header showLogo showLeftIcon />
        <Text style={styles.content}>
          {'Enter your current postal code or address. '}
        </Text>
        <Input
          value={valueText}
          onChangeText={text => {
            setValueText(text);
          }}
          showDropDown={true}
          dropDownData={addressList}
          dropDownKey={'value'}
        />
      </View>
      <View style={styles.buttonContainer}>
        {!keyboardVisible && (
          <PrimaryButton
            type="fill"
            title="Submit"
            onPress={() => {
              onSubmit();
            }}
            style={styles.button}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ManualLocationScreen;

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
    marginTop: hp(60),
    marginBottom: hp(40),
  },
  buttonContainer: {
    alignSelf: 'center',
    gap: hp(16),
    marginBottom: hp(38),
  },
  button: {
    paddingHorizontal: wp(90),
  },
  error: {
    ...commonFontStyle(500, 14, colors.red),
    paddingHorizontal: wp(50),
    // marginTop: hp(10),
  },
});
