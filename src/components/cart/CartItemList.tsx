/* eslint-disable react-native/no-inline-styles */
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
import {PrimaryButton} from '../common';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';

interface Props {
  index: number;
  showSaveForLater?: boolean;
  outOfStock?: boolean;
  productImage?: any;
  productName?: string;
  price?: number;
  quantity?: number;
  onPressInc?: () => void;
  onPressDec?: () => void;
  onPressRemove?: () => void;
  onPressSave?: () => void;
}

const CartItemList = ({
  index,
  showSaveForLater = true,
  outOfStock = false,
  productImage = Icons.image,
  productName = 'Organic Apples',
  price = 2.99,
  quantity = 1,
  onPressInc,
  onPressDec,
  onPressRemove,
  onPressSave,
}: Props) => {
  return (
    <View style={[styles.mainView]}>
      <View style={styles.imageStyle}>
        <View style={styles.imageViewStyle}>
          <Image
            resizeMode="cover"
            source={productImage}
            style={styles.imgStyle}
          />
        </View>
        <View style={{flex: 1, marginLeft: 12}}>
          <Text numberOfLines={2} style={styles.text1}>
            {productName}
          </Text>
          <Text style={styles.text2}>
            ${price} <Text style={styles.text3}>per item</Text>
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              width: SCREEN_WIDTH * 0.62,
              flex: 1,
              alignItems: 'center',
              justifyContent: !showSaveForLater ? 'flex-end' : 'space-between',
              ...styles.removeBtn,
              paddingRight: 10,
            }}>
            <TouchableOpacity style={{}} onPress={onPressRemove}>
              <Text style={styles.btnText}>
                {outOfStock ? 'Add Replacement ' : 'Remove'}
              </Text>
            </TouchableOpacity>
            {showSaveForLater && (
              <TouchableOpacity style={{}} onPress={onPressSave}>
                <Text style={styles.btnText}>Save for later</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {outOfStock ? (
          <>
            <View style={styles.outOfStockContainer}>
              <Text style={styles.outOfStockText}>Item Out of Stock</Text>
            </View>
          </>
        ) : (
          <View style={styles.addBtnView}>
            <TouchableOpacity onPress={onPressDec}>
              <Image
                resizeMode="cover"
                source={Icons.ic_minus}
                style={styles.moreStyle}
              />
            </TouchableOpacity>
            <Text style={styles.valueText}>{quantity}</Text>
            <TouchableOpacity onPress={onPressInc}>
              <Image
                resizeMode="cover"
                source={Icons.ic_plus}
                style={styles.moreStyle}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CartItemList;

const styles = StyleSheet.create({
  mainView: {
    marginBottom: hp(12),
  },
  imageStyle: {
    flexDirection: 'row',
    gap: 5,
  },
  imageViewStyle: {
    height: wp(100),
    width: wp(100),
    backgroundColor: colors.grey_F5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(8),
  },
  imgStyle: {
    height: wp(75),
    width: wp(75),
    resizeMode: 'contain',
  },
  moreStyle: {
    height: wp(12),
    width: wp(12),
    resizeMode: 'contain',
    paddingVertical: 18,
  },
  shopping_bag: {
    height: wp(12),
    width: wp(12),
    resizeMode: 'contain',
    marginRight: 6,
  },
  text1: {
    ...commonFontStyle(700, 15, colors.black),
  },
  text2: {
    ...commonFontStyle(600, 16, colors.black),
    marginTop: 5,
  },
  text3: {
    ...commonFontStyle(600, 14, colors.black),
  },
  titleTextStyle1: {
    ...commonFontStyle(400, 16, colors.black),
    marginTop: hp(4),
    width: wp(120),
  },
  addBtnView: {
    flexDirection: 'row',
    borderWidth: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: wp(100),
    justifyContent: 'space-around',
    // height:39,
    borderRadius: 8,
  },
  removeBtn: {
    position: 'absolute',
    bottom: 0,
  },
  btnText: {
    ...commonFontStyle(600, 16, colors.secondaryPrimary),
  },
  valueText: {
    ...commonFontStyle(600, 18, colors.black),
  },
  outOfStockText: {
    ...commonFontStyle(600, 12, colors.red),
  },
  outOfStockContainer: {
    backgroundColor: colors.pink_light,
    borderRadius: wp(8),
    alignSelf: 'flex-start',
    padding: 5,
  },
});
