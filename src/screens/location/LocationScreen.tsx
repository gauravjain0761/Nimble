import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {Icons} from '../../assets';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {useRoute} from '@react-navigation/native';
import {Header, PrimaryButton} from '../../components/common';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';
import {requestLocationPermission} from '../../utils/permission';

const LocationScreen = () => {
  const {params}: any = useRoute();
  const enableLocation = async () => {
    const granted = await requestLocationPermission();
    if (granted) {
      if (params?.option === 'Self Check-out') {
        navigationRef.navigate(screenName.StoreListScreen);
      } else {
        navigationRef.navigate(screenName.bottom_tab_navigator);
      }
    }
  };

  const onManually = () => {
    if (params?.option === 'Self Check-out') {
      navigationRef.navigate(screenName.SearchStoreScreen);
    } else {
      navigationRef.navigate(screenName.ManualLocationScreen);
    }
  };
  return (
    <SafeAreaView style={[AppStyles.flex, styles.container]}>
      <View style={styles.logo_container}>
        <Header showLogo showLeftIcon />
        <Text style={styles.content}>
          {'Got it! First, '}
          {params?.option == 'Order & Pick up'
            ? 'We need your location access to find the stores in your area.'
            : 'We need your location access to find the store you are at.'}
        </Text>
        <Image
          source={Icons.location}
          resizeMode="contain"
          style={styles.location}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          type="fill"
          title="Enable Location"
          onPress={() => {
            enableLocation();
          }}
          style={styles.button}
        />
        <PrimaryButton
          type="outline"
          title="Enter Manually"
          onPress={() => {
            onManually();
          }}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;

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
