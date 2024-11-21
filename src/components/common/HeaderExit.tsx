//import liraries
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HeaderProps} from '../../utils/types';
import {Icons} from '../../assets';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, isIos, wp} from '../../theme/fonts';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';

const HeaderExit = ({
  title,
  onBackPressScreen,
  showLeftIcon,
  showRightIcon,
  rightIcon,
  showLogo = false,
}: HeaderProps) => {
  const {goBack} = useNavigation();

  const onBackPress = () => {
    if (onBackPressScreen) {
      onBackPressScreen();
    } else {
      goBack();
    }
  };
  return (
    <View style={{...styles.container}}>
      {showLeftIcon ? (
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigationRef.resetRoot({
              index: 0,
              routes: [{name: screenName.bottom_tab_navigator}],
            });
          }}>
          <Text style={styles.exit}>EXIT</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.iconStyle} />
      )}
      {showLogo ? (
        <Image source={Icons.logo} style={styles.logo} resizeMode="contain" />
      ) : (
        <Text numberOfLines={1} style={styles.titleTextStyle}>
          {title}
        </Text>
      )}
      {showRightIcon ? (
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigationRef.navigate(screenName.NeedHelpScreen);
            // navigationRef.resetRoot({
            //   index: 0,
            //   routes: [{name: screenName.NeedHelpScreen}],
            // });
          }}>
          <Text style={styles.exit}>Help</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.iconStyle} />
      )}
      {/* {isDeleteIcon && (
        <TouchableOpacity onPress={onPressDelete}>
          <Image
            // @ts-ignore
            resizeMode="contain"
            source={icons.delete}
            style={styles.deleteIconStyle}
          />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: hp(10),
    paddingHorizontal: wp(16),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: isIos ? 0 : 10,
  },
  iconStyle: {
    width: wp(36),
    height: hp(36),
  },
  titleTextStyle: {
    ...commonFontStyle(700, 18, colors.black),
    textAlign: 'center',
    paddingHorizontal: wp(10),
  },
  heartIconStyle: {
    height: wp(25),
    width: wp(25),
    marginTop: hp(1.7),
    tintColor: colors.black,
  },
  rightIconStyle: {
    width: wp(28),
    height: hp(28),
  },
  logo: {
    width: wp(140),
    height: hp(100),
    alignSelf: 'center',
  },
  exit: {
    ...commonFontStyle(400, 16, colors.black),
  },
});

export default HeaderExit;
