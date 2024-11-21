import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {colors} from '../../../theme/colors';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  commonFontStyle,
  hp,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  wp,
} from '../../../theme/fonts';
import {Icons} from '../../../assets';
import {Header} from '../../../components/common';
import {navigationRef} from '../../../navigation/mainNavigator';

interface IModalProps {
  isVisible: boolean;
  onClose: (value: boolean) => void;
}

interface ImageTextViewProps {
  image: any;
  title: string;
  style?: ViewStyle;
  onPress?: () => void;
}

const ImageTextView = ({image, title, style, onPress}: ImageTextViewProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.imageTextView, ...style}}>
      <Image
        source={image}
        style={styles.imageStyle}
        resizeMode="contain"
        tintColor={colors.secondaryPrimary}
      />
      <Text style={{...styles.titleText}}>{title}</Text>
    </TouchableOpacity>
  );
};

const MapModal = ({isVisible, onClose}: IModalProps) => {
  const goMaps = (lat: number, lng: number) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${lat},${lng}`;
    Linking.openURL(url);
  };

  const dialCall = (number: number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const Region = {
    latitude: 35.6541,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <SafeAreaView style={styles.modalContainer}>
        <View>
          <Header
            title="Fulton Market"
            rightIcon={Icons.ic_close}
            showRightIcon
            onBackPressScreen={() => {
              onClose(false);
            }}
          />
          <View style={styles.map}>
            <MapView
              provider={
                Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
              }
              mapType="terrain"
              googleRenderer="LEGACY"
              style={styles.map}
              region={Region}>
              <Marker coordinate={Region} />
            </MapView>
            <TouchableOpacity
              style={styles.sendIcon}
              onPress={() => goMaps(Region.latitude, Region.longitude)}>
              <Image source={Icons.send} style={styles.close} />
            </TouchableOpacity>
          </View>
          <View style={styles.detailsView}>
            <ImageTextView image={Icons.ic_location} title={'Fulton Market'} />
            <ImageTextView image={Icons.clock} title={'15:00 - 18:00'} />
            <ImageTextView
              image={Icons.phone}
              title={'(123) 456-7890'}
              onPress={() => dialCall(1234567890)}
            />

            <ImageTextView
              image={Icons.share}
              title={'Share Store'}
              style={{marginTop: 20}}
            />
            <ImageTextView image={Icons.rate_star} title={'Rate Store'} />
            <ImageTextView image={Icons.ready} title={'View All Products'} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default MapModal;

const styles = StyleSheet.create({
  modalContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: colors.white,
    alignSelf: 'center',
  },
  map: {
    width: '100%',
    height: hp(300),
    marginTop: hp(10),
  },
  closeIcon: {
    position: 'absolute',
    height: hp(30),
    width: hp(30),
    top: hp(30),
    right: hp(10),
  },
  close: {
    height: hp(30),
    width: hp(30),
  },
  sendIcon: {
    position: 'absolute',
    height: hp(40),
    width: hp(40),
    bottom: hp(10),
    right: hp(10),
    backgroundColor: colors.white,
    borderRadius: hp(15),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: hp(5),
    elevation: 5,
  },
  detailsView: {
    paddingTop: hp(30),
    marginHorizontal: wp(16),
    gap: hp(25),
  },
  imageTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15,
  },
  imageStyle: {
    width: wp(20),
    height: hp(20),
  },
  titleText: {
    ...commonFontStyle(400, 16, colors.black),
  },
});
