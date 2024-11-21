import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {InputProps, PrimaryButtonProps} from '../../utils/types';
import {colors} from '../../theme/colors';
import {
  commonFontStyle,
  hp,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  wp,
} from '../../theme/fonts';
import {Icons} from '../../assets';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';

interface Props {
  index?: number;
  productIcon?: 'wishlist' | 'cart';
  productImage?: any;
  isOffer?: boolean;
  onPressIcon?: () => void;
  price?: number | string;
  name?: string;
  onPress?: () => void;
  onPressHeart?: () => void;
  heartIcon?: boolean;
  isWishlist?: boolean;
}

const WishlistItem: FC<Props> = ({
  index,
  productIcon,
  productImage,
  isOffer,
  onPressIcon,
  price,
  name,
  onPress,
  onPressHeart,
  heartIcon,
  isWishlist = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.mainView, {marginTop: 10}]}>
      <View style={styles.imageStyle}>
        <Image
          resizeMode="cover"
          source={productImage || Icons.image}
          style={styles.imgStyle}
        />
        {(index == 0 || isOffer === true) && (
          <View style={styles.headerView}>
            <Text style={styles.headerText}>10% off</Text>
          </View>
        )}
        <TouchableOpacity style={styles.plusIconView} onPress={onPressIcon}>
          <Image
            source={Icons.plus}
            style={styles.plusIcon}
            tintColor={colors.secondaryPrimary}
          />
        </TouchableOpacity>
        {/* {heartIcon && (
          <TouchableOpacity
            style={styles.heartIconContainer}
            onPress={onPressHeart}>
            <Image
              source={isWishlist ? Icons.heartFill : Icons.heart}
              style={styles.plusIcon}
              tintColor={colors.red}
            />
          </TouchableOpacity>
        )} */}
      </View>
      <Text numberOfLines={1} style={styles.titleTextStyle}>
        {price || '$5.99'}
      </Text>
      <Text numberOfLines={3} style={styles.titleTextStyle1}>
        {name || 'Organic Fresh Gala Apples 2 Ibs bag '}
      </Text>
    </TouchableOpacity>
  );
};

export default WishlistItem;

const styles = StyleSheet.create({
  mainView: {
    // width: wp(80),
    elevation: 2,
    // flex: 1,
  },
  imageStyle: {
    height: wp(145),
    width: wp(145),
    backgroundColor: colors.grey_F5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  imgStyle: {
    height: wp(124),
    width: wp(124),
    resizeMode: 'contain',
  },
  titleTextStyle: {
    ...commonFontStyle(600, 20, colors.black),
    marginTop: hp(10),
  },
  titleTextStyle1: {
    ...commonFontStyle(400, 16, colors.black),
    marginTop: hp(4),
    width: wp(120),
  },
  headerView: {
    backgroundColor: colors.secondaryPrimary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  headerText: {
    ...commonFontStyle(400, 14, colors.white),
  },

  heartIconContainer: {
    height: wp(40),
    width: wp(40),
    backgroundColor: colors.white,
    borderRadius: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    left: -10,
    position: 'absolute',
    bottom: 0,
    shadowColor: colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: wp(5),
    elevation: 5,
  },
  plusIconView: {
    height: wp(40),
    width: wp(40),
    backgroundColor: colors.white,
    borderRadius: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    right: -10,
    position: 'absolute',
    bottom: 0,
    shadowColor: colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: wp(5),
    elevation: 5,
  },
  plusIcon: {
    height: wp(18),
    width: wp(18),
    resizeMode: 'contain',
  },
});
