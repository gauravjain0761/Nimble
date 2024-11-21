import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {colors} from '../../theme/colors';
import {Header, PrimaryButton} from '../../components/common';
import {Icons} from '../../assets';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';
import {commonFontStyle, hp, wp} from '../../theme/fonts';

const OrderConfirmation: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={'Order Confirmation'}
        showRightIcon
        rightIcon={Icons.ic_close}
        onBackPressScreen={() => {
          navigationRef.navigate(screenName.ImageClickScreen);
        }}
      />
      <View style={styles.container}>
        <Text style={[styles.headerText]}>
          {'Your order is ready for pickup!'}
        </Text>
        <Text style={[styles.headerTextTwo]}>
          {'Use the following QR code for pick up.'}
        </Text>

        <Text style={styles.orderText}>{'Order #0123456'}</Text>

        <Image
          source={Icons.qr}
          resizeMode="contain"
          style={styles.qrCodeStyle}
        />
        <Text style={[styles.instructionText]}>{'Pickup Instruction'}</Text>
        <Text style={[styles.instructionTextTwo]}>
          {
            'Show the staff this QR code to pick up. You can find this QR code under “Notification”. '
          }
        </Text>
        <PrimaryButton
          type="outline"
          title="View Store Location"
          style={styles.button}
          onPress={() => {
            navigationRef.reset({
              index: 0,
              routes: [{name: screenName.bottom_tab_navigator}],
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerText: {
    ...commonFontStyle(600, 24, colors.black),
    textAlign: 'center',
    marginTop: 25,
  },
  headerTextTwo: {
    ...commonFontStyle(400, 16, colors.grey_99),
    textAlign: 'center',
  },
  orderText: {
    ...commonFontStyle(700, 20, colors.green_04),
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  qrCodeStyle: {
    width: '100%',
    height: hp(180),
  },
  instructionText: {
    ...commonFontStyle(600, 18, colors.black),
    textAlign: 'center',
    marginTop: '40%',
    marginBottom: 10,
  },
  instructionTextTwo: {
    ...commonFontStyle(400, 14, colors.grey_99),
    textAlign: 'center',
    paddingHorizontal: wp(20),
  },
  button: {
    marginHorizontal: wp(45),
    marginTop: hp(30),
  },
});
