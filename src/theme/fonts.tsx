import {Dimensions, Platform, PixelRatio} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

export function getFontType(fontWeight: any) {
  if (fontWeight == 600) {
    return 'Lato-Semibold';
  } else if (fontWeight == 400) {
    return 'Lato-Regular';
  } else if (fontWeight == 700) {
    return 'Lato-Bold';
  } else if (fontWeight == 800) {
    return 'Lato-Heavy';
  } else if (fontWeight == 500) {
    return 'Lato-Medium';
  } else if (fontWeight == 300) {
    return 'Lato-Light';
  } else {
    return 'Lato-Regular';
  }
}

export const fontSize = (val: number) => RFValue(val, 812);

export const commonFontStyle = (
  fontWeight: any,
  fontSizes: any,
  color: any,
) => {
  return {
    fontFamily: getFontType(fontWeight),
    fontSize: fontSize(fontSizes),
    color: color,
    includeFontPadding: false,
  };
};

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

export const wp = (val: number) => {
  return widthPercentageToDP((val * 100) / 375);
};

export const hp = (val: number) => {
  return heightPercentageToDP((val * 100) / 812);
};

const scale = SCREEN_WIDTH / 320;

export const isIos = Platform.OS === 'ios';

export function actuatedNormalize(size: any) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
