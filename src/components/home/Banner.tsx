import React from 'react';
import {StyleSheet, Pressable, Image} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {screenName} from '../../helper/constants';
import {hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {Icons} from '../../assets';

type bannerItem = {
  data: any;
};

const Banner = ({data, showImage}: bannerItem) => {
  const {navigate} = useNavigation();
  const onPressItem = () => {};

  return (
    <Pressable
      onPress={onPressItem}
      style={[
        styles.container,
        {
          backgroundColor: showImage ? colors.grey_FC : 'transparent',
          height: showImage ? hp(210) : hp(190),
        },
      ]}>
      {showImage ? (
        <Image
          style={styles.bannerStyle}
          source={Icons.image3}
          resizeMode={'contain'}
        />
      ) : (
        <Image
          style={styles.bannerStyle}
          source={data?.image}
          resizeMode={'contain'}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(190),
    alignSelf: 'center',
  },
  bannerStyle: {
    width: '100%',
    height: hp(195),
  },
});

export default Banner;
