import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {Icons} from '../../assets';

interface IStoreItem {
  image: any;
  title: string;
  onPress?: () => void;
}

const StoreItem = ({image, title, onPress}: IStoreItem) => {
  return (
    <TouchableOpacity style={[styles.mainView]} onPress={onPress}>
      <Image
        resizeMode="cover"
        source={image ?? Icons.image1}
        style={styles.imgStyle}
      />

      <Text numberOfLines={2} style={styles.titleTextStyle}>
        {title ?? 'Deli Grocery'}
      </Text>
    </TouchableOpacity>
  );
};

export default StoreItem;

const styles = StyleSheet.create({
  mainView: {
    width: wp(100),
    marginLeft: wp(14),
  },
  imgStyle: {
    height: hp(70),
    width: wp(100),
  },
  titleTextStyle: {
    ...commonFontStyle(400, 12, colors.black),
    textAlign: 'center',
  },
});
