import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../../theme/colors';
import {commonFontStyle, hp} from '../../../theme/fonts';
import {Icons} from '../../../assets';
import {Header, PrimaryButton} from '../../../components/common';
import {screenName} from '../../../navigation/screenNames';
import {Camera} from 'react-native-vision-camera';
const listData = [
  {
    id: 1,
    title: 'Snap photos of items to add\nthem to your cart.',
  },
  {
    id: 2,
    title: 'Review and edit your cart\nanytime.',
  },
  {
    id: 3,
    title: 'Pay securely to receive your exit\nQR code and emailed receipt.',
  },
];
const StartCheckoutScreen = ({navigation}: any) => {
  const onStartCheckout = async () => {
    try {
      // Get current camera permission status
      const cameraPermission = await Camera.getCameraPermissionStatus();
      console.log('Initial camera permission status:', cameraPermission);

      if (cameraPermission !== 'authorized' && cameraPermission !== 'granted') {
        console.log('Requesting camera permission...');
        const newPermission = await Camera.requestCameraPermission();
        console.log(
          'New camera permission status after request:',
          newPermission,
        );

        // Check if the new permission is valid
        if (newPermission !== 'authorized' && newPermission !== 'granted') {
          console.log('Permission not granted. Aborting navigation.');
          return; // Exit if permission is not granted
        }
      }

      console.log('Permission granted. Navigating to ImageClickScreen.');
      navigation.navigate(screenName.ImageClickScreen);
    } catch (error) {
      console.error('Error during camera permission check:', error);
    }
  };

  const onPressHelp = () => {
    navigation.navigate(screenName.NeedHelpScreen);
  };

  const renderListData = (item: any, index: number) => {
    return (
      <View key={index} style={styles.renderContainer}>
        <Text style={styles.titleText}>{index + 1 + '. '}</Text>
        <Text style={styles.titleText}>{item.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showLogo showLeftIcon />

      <ScrollView style={styles.container}>
        <Text style={styles.headingText}>
          {"You're ready to check out at Starbank Convenience #35."}
        </Text>
        <Image
          source={Icons.payment_processed}
          style={styles.imageStyle}
          resizeMode="contain"
        />
        {listData.map(renderListData)}
        <PrimaryButton
          title={'Start Checkout'}
          type="fill"
          onPress={() => {
            onStartCheckout();
          }}
          style={styles.btnStyle}
        />
        <Text onPress={onPressHelp} style={styles.helpText}>
          Need help? Tap here for assistance.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StartCheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  headingText: {
    ...commonFontStyle(700, 24, colors.secondaryPrimary),
    textAlign: 'left',
    paddingHorizontal: hp(25),
  },
  imageStyle: {
    height: hp(200),
    width: hp(200),
    alignSelf: 'center',
  },
  renderContainer: {
    flexDirection: 'row',
    padding: hp(10),
    paddingHorizontal: hp(60),
  },
  titleText: {
    ...commonFontStyle(600, 18, colors.black),
    textAlign: 'left',
  },
  btnStyle: {
    marginHorizontal: hp(50),
    marginTop: hp(50),
  },
  helpText: {
    ...commonFontStyle(400, 16, colors.black),
    textAlign: 'center',
    marginTop: hp(20),
    textDecorationLine: 'underline',
  },
});
