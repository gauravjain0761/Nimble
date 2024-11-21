import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {PrimaryButtonProps} from '../../utils/types';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, wp} from '../../theme/fonts';

const PrimaryButton: FC<PrimaryButtonProps> = ({
  onPress = () => {},
  title = 'Enter Title',
  disabled,
  style,
  titleStyle,
  type = 'fill',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[type === 'fill' ? styles.container : styles.outline, style]}>
      <Text
        style={[
          type === 'fill' ? styles?.title : styles.outlineText,
          titleStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: wp(32),
    paddingVertical: hp(5.5),
    // elevation: 1,
  },
  title: {
    alignSelf: 'center',
    ...commonFontStyle(700, 18, colors?.white),
    lineHeight: hp(37),
  },
  outline: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: wp(32),
    paddingVertical: hp(5),
    borderColor: colors.primary_07,
    borderWidth: 0.6,
    // elevation: 1,
  },
  outlineText: {
    alignSelf: 'center',
    ...commonFontStyle(700, 18, colors?.grey_80),
    lineHeight: hp(37),
  },
});
