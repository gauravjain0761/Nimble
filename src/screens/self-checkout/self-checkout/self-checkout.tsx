/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icons} from '../../../assets';
import {colors} from '../../../theme/colors';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../../theme/fonts';
import {PrimaryButton} from '../../../components/common';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {screenName} from '../../../navigation/screenNames';

const SelfCheckout = ({navigation}: {navigation: any}) => {
  const [selectTab, setSelectTab] = useState(2);
  useEffect(() => {
    if (selectTab === 1) {
      navigation.goBack();
    }
  }, [navigation, selectTab]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Icons.logohome} style={styles.logoHome} />
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            setSelectTab(1);
          }}
          style={[
            styles.headerBtn,
            {
              borderWidth: selectTab === 1 ? 1.2 : 0,
              backgroundColor: selectTab === 1 ? colors.tabBg : colors.white,
              borderRightWidth: selectTab === 1 ? 2.5 : 0,
            },
          ]}>
          <Text style={styles.headerBtnText}>Order & Pickup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectTab(2);
          }}
          style={[
            styles.headerBtn,
            {
              borderWidth: selectTab === 2 ? 1.4 : 0,
              backgroundColor: selectTab === 2 ? colors.tabBg : colors.white,
              borderLeftWidth: selectTab === 2 ? 2.5 : 0,
            },
          ]}>
          <Text style={styles.headerBtnText}>Self Check-out</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>
        {'Skip the queue\nwith our AI-assisted\nself-checkout'}
      </Text>

      <Image
        resizeMode="contain"
        style={styles.image}
        source={Icons.onboarding1}
      />

      <PrimaryButton
        title="Start Checkout"
        onPress={() => {
          navigation.navigate(screenName.LocationScreen, {
            option: 'Self Check-out',
          });
        }}
        style={{
          marginHorizontal: wp(50),
          marginTop: heightPercentageToDP(10),
        }}
      />
    </SafeAreaView>
  );
};

export default SelfCheckout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logoHome: {
    width: 62,
    height: 42,
    alignSelf: 'center',
  },
  headerView: {
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 24,
    borderRadius: 24,
    justifyContent: 'space-around',
    marginBottom: 10,
    borderColor: colors.grey_DA,
  },
  headerBtn: {
    flexDirection: 'row',
    borderRadius: 24,
    flex: 1,
    justifyContent: 'center',
    borderColor: colors.borderColor,
    height: 32,
    alignItems: 'center',
  },
  headerBtnText: {
    ...commonFontStyle(400, 14, colors?.black),
  },

  title: {
    ...commonFontStyle(600, 24, colors.black),
    marginTop: hp(54),
    textAlign: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: hp(284),
  },
});
