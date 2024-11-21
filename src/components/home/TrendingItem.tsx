import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {InputProps, ListComponent, PrimaryButtonProps} from '../../utils/types';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, SCREEN_HEIGHT, wp} from '../../theme/fonts';
import {Icons} from '../../assets';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';

const TrendingItem: FC<ListComponent> = ({
  index,
  amount = 5.99,
  containerStyle,
  description,
  images,
  offerAmount = 10,
  offerIndex = 0,
  onPress,
  showAddIcon = true,
  showofferBadge = true,
  onPressAdd,
  descriptionStyle,
  priceStyle,
  imageContainerStyle,
  heartIcon = true,
  onPressHeart,
  isWishlist,
}) => {
  return (
    <View style={[styles.mainView, containerStyle]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.imageStyle, imageContainerStyle]}>
        <Image
          resizeMode="cover"
          source={images || Icons.image}
          style={styles.imgStyle}
        />
        {showofferBadge && index == offerIndex && (
          <View style={styles.headerView}>
            <Text style={styles.headerText}>{offerAmount}% off</Text>
          </View>
        )}
        {showAddIcon && (
          <TouchableOpacity onPress={onPressAdd} style={styles.plusIconView}>
            <Image
              source={Icons.plus}
              style={styles.plusIcon}
              tintColor={colors.secondaryPrimary}
            />
          </TouchableOpacity>
        )}
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
      </TouchableOpacity>
      <Text numberOfLines={1} style={[styles.titleTextStyle, priceStyle]}>
        {'$'}
        {amount}
      </Text>
      <Text
        numberOfLines={3}
        style={[styles.titleTextStyle1, descriptionStyle]}>
        {description || 'Organic Fresh Gala Apples 2 Ibs bag '}
      </Text>
    </View>
  );
};

export default TrendingItem;

const styles = StyleSheet.create({
  mainView: {
    width: wp(80),
    marginRight: wp(24),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 2.84,
    // elevation: 5,
    
    paddingTop: 5,
  },
  imageStyle: {
    height: wp(90),
    width: wp(90),
    backgroundColor: colors.grey_F5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  imgStyle: {
    height: wp(70),
    width: wp(70),
    resizeMode: 'contain',
  },
  titleTextStyle: {
    ...commonFontStyle(600, 16, colors.black),
    marginTop: hp(10),
  },
  titleTextStyle1: {
    ...commonFontStyle(400, 12, colors.black),
    marginTop: hp(10),
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
    ...commonFontStyle(400, 10, colors.white),
  },
  heartIconContainer: {
    height: wp(32),
    width: wp(32),
    backgroundColor: colors.white,
    borderRadius: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    position: 'absolute',
    bottom: 0,
    shadowColor: colors.grey_B5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12.0,
    elevation: 10,
  },
  plusIconView: {
    height: wp(32),
    width: wp(32),
    backgroundColor: colors.white,
    borderRadius: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    position: 'absolute',
    bottom: 0,
    shadowColor: colors.grey_B5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12.0,
    elevation: 10,
  },
  plusIcon: {
    height: wp(14),
    width: wp(14),
    resizeMode: 'contain',
  },
});
