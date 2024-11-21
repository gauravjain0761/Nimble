/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {Icons} from '../../assets';
import {PrimaryButton} from '../common';

interface IProps {
  index: number;
  onPressViewOrder: () => void;
  name?: string;
  price?: number | string;
  time?: string;
  image?: any;
  status?: string;
}

const OrdersItem = ({
  index,
  onPressViewOrder,
  name,
  price,
  time,
  image,
  status,
}: IProps) => {
  return (
    <View style={[styles.mainView]}>
      <View style={styles.imageStyle}>
        <Image
          resizeMode="cover"
          source={image || Icons.cartImage}
          style={styles.imgStyle}
        />
        <View style={{flex: 1, marginLeft: 12}}>
          <Text style={styles.text1}>{name || 'Fulton Market'}</Text>
          <Text style={styles.text2}>Total: ${price}</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Image source={Icons.shopping_bag} style={styles.shopping_bag} />
            <Text style={styles.text3}>Estimate pickup {time}</Text>
          </View>
        </View>
        <View
          style={[
            styles.inProView,
            {
              backgroundColor:
                status === 'Cancelled'
                  ? colors.red_opacity_10
                  : colors.green_FE,
            },
          ]}>
          <Text
            style={[
              styles.rightText,
              {
                color:
                  status === 'Cancelled' ? colors.red : colors.secondaryPrimary,
              },
            ]}>
            {status}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          type="fill"
          title="View Order"
          onPress={() => {
            onPressViewOrder();
            // navigationRef.navigate(screenName.CheckoutScreen);
          }}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default OrdersItem;

const styles = StyleSheet.create({
  mainView: {
    borderWidth: 1,
    marginBottom: hp(12),
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderColor: colors.grey_20,
  },
  imageStyle: {
    flexDirection: 'row',
  },
  imgStyle: {
    height: wp(40),
    width: wp(40),
    resizeMode: 'contain',
    borderRadius: wp(40),
  },
  moreStyle: {
    height: wp(23),
    width: wp(23),
    resizeMode: 'contain',
  },
  shopping_bag: {
    height: wp(12),
    width: wp(12),
    resizeMode: 'contain',
    marginRight: 6,
  },
  text1: {
    ...commonFontStyle(600, 18, colors.black),
  },
  text2: {
    ...commonFontStyle(600, 14, colors.black),
    marginTop: 5,
  },
  text3: {
    ...commonFontStyle(600, 14, colors.green_04),
    marginTop: 2,
  },
  titleTextStyle1: {
    ...commonFontStyle(400, 16, colors.black),
    marginTop: hp(4),
    width: wp(120),
  },

  buttonContainer: {
    alignSelf: 'center',
    marginTop: hp(24),
  },
  button: {
    width: SCREEN_WIDTH * 0.84,
    paddingVertical: hp(3),
  },
  titleStyle: {
    ...commonFontStyle(700, 18, colors?.black),
  },
  rightText: {
    ...commonFontStyle(600, 12, colors?.secondaryPrimary),
  },
  inProView: {
    backgroundColor: 'red',
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
  },
});
