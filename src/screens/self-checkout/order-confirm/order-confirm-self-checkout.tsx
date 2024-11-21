import {
  BackHandler,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import {colors} from '../../../theme/colors';
import {Header, PrimaryButton} from '../../../components/common';
import {Icons} from '../../../assets';
import {navigationRef} from '../../../navigation/mainNavigator';
import {screenName} from '../../../navigation/screenNames';
import {commonFontStyle, hp, wp} from '../../../theme/fonts';
import {useRoute} from '@react-navigation/native';

const OrderConfirmationSelfCheckout: FC = () => {
  const {params}: any = useRoute();
  useEffect(() => {
    const handleBackPress = () => {
      navigationRef.navigate(screenName.ImageClickScreen);
      return true; // Prevent default behavior of back button
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
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
          {'Thank you for shopping with us!'}
        </Text>
        <Text style={[styles.headerTextTwo]}>
          {'Use the following QR code to exit store. '}
        </Text>

        <Text style={styles.orderText}>{'Order #0123456'}</Text>

        <Image
          source={Icons.qr}
          resizeMode="contain"
          style={styles.qrCodeStyle}
        />
        <Text style={[styles.instructionText]}>{'Exit Instruction'}</Text>
        <Text style={[styles.instructionTextTwo]}>
          {'Scan QR code at gate or show it to the staff \nto exit store.'}
        </Text>
        <PrimaryButton
          type="outline"
          title="View Order Receipt"
          style={styles.button}
          onPress={() => {
            // navigationRef.reset({
            //   index: 0,
            //   routes: [{name: screenName.ReceiptScreen}],
            // });

            // Navigate with parameters
            navigationRef.navigate(screenName.ReceiptScreen, {
              cartItem: params.cartItem,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderConfirmationSelfCheckout;

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
