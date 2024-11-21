import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {Icons} from '../../assets';
import {PrimaryButton} from '../common';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';
import {Menu, MenuItem} from 'react-native-material-menu';

interface Props {
  storeName?: string;
  total?: number;
  storeImage?: string;
  index?: number;
  item?: any;
  onRemove?: () => void;
  onPressStore?: () => void;
  time: string;
  date: string;
}

const CartItem: FC<Props> = ({
  storeName,
  total,
  storeImage,
  item,
  index,
  onRemove = () => {},
  onPressStore = () => {},
  time,
  date,
}) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => {
    onRemove();
    setVisible(false);
  };

  const showMenu = () => setVisible(true);

  return (
    <View style={[styles.mainView]}>
      <View style={styles.imageStyle}>
        <Image
          resizeMode="contain"
          source={storeImage || Icons.cartImage}
          style={styles.imgStyle}
        />
        <View style={{flex: 1, marginLeft: 12}}>
          <Text style={styles.text1}>{storeName || 'Fulton Market'}</Text>
          <Text style={styles.text2}>Current Total: ${total}</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Image source={Icons.shopping_bag} style={styles.shopping_bag} />
            <Text style={styles.text3}>
              Ready for pickup, {time} {date}
            </Text>
          </View>
        </View>
        <Menu
          visible={visible}
          anchor={
            <TouchableOpacity onPress={showMenu}>
              <Image
                resizeMode="cover"
                source={Icons.more}
                style={styles.moreStyle}
              />
            </TouchableOpacity>
          }
          onRequestClose={() => setVisible(false)}>
          <MenuItem onPress={hideMenu} textStyle={styles.text2}>
            Remove
          </MenuItem>
        </Menu>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          type="fill"
          title="View Cart"
          onPress={() => {
            navigationRef.navigate(screenName.CartScreen, {
              cartItem: item,
            });
          }}
          style={[styles.button, {marginBottom: 10}]}
        />
        <PrimaryButton
          type="outline"
          title="Go to Store"
          onPress={onPressStore}
          style={styles.button}
          titleStyle={styles.titleStyle}
        />
      </View>
    </View>
  );
};

export default CartItem;

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
    height: wp(50),
    width: wp(50),
    // borderRadius: wp(40),
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
    marginBottom: 3,
  },
  text2: {
    ...commonFontStyle(600, 14, colors.black),
  },
  text3: {
    ...commonFontStyle(600, 14, colors.green_04),
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
});
