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
import {commonFontStyle, hp, SCREEN_HEIGHT, wp} from '../../theme/fonts';
import {Icons} from '../../assets';

const SearchInput: FC<InputProps> = ({
  style,
  value,
  onChangeText,
  placeholder,
  disabled = false,
  onPressRight,
  showRightIcon = true,
  showLeftIcon = false,
  showClearIcon = true,
  rightIcon,
  leftIcon,
  backButton = false,
  onPressLeft,
  placeholderColor,
  inputStyle,
}) => {
  const onPressClear = () => {
    onChangeText('');
  };
  return (
    <View style={[styles.mainView, style]}>
      {showLeftIcon && (
        <TouchableOpacity
          style={styles.leftPress}
          hitSlop={10}
          onPress={onPressLeft}>
          <Image
            style={backButton ? styles.back : styles.icons}
            source={backButton ? Icons.back : leftIcon}
          />
        </TouchableOpacity>
      )}
      {disabled ? (
        <View style={[styles.viewStyle]}>
          <Text style={styles.textcolor}>{placeholder}</Text>
        </View>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.inputStyle, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor || colors.grey_B5}
        />
      )}
      {showRightIcon &&
        (showClearIcon && value?.length > 0 ? (
          <TouchableOpacity onPress={onPressClear}>
            <Image source={Icons.delete} style={styles.clear} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPressRight}>
            <Image source={rightIcon} style={styles.icons} />
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  mainView: {
    borderRadius: wp(8),
    alignSelf: 'center',
    backgroundColor: colors.inputBack,
    paddingHorizontal: 12,
    // justifyContent:'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grey_20,
  },
  inputStyle: {
    ...commonFontStyle(600, 16, colors?.black),
    flex: 1,
    height: hp(40),
  },
  dropDownStyle: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.062,
    borderWidth: 1,
    alignSelf: 'center',
    width: '75%',
    borderColor: colors.grey_20,
  },
  listText: {
    ...commonFontStyle(600, 16, colors?.grey_50),
  },
  listView: {
    borderTopWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopColor: colors.grey_20,
  },
  icons: {
    width: 20,
    height: 20,
  },
  viewStyle: {
    flex: 1,
    height: hp(40),
    justifyContent: 'center',
  },
  textcolor: {
    ...commonFontStyle(600, 16, colors?.grey_50),
  },
  clear: {
    width: 20,
    height: 20,
  },
  back: {
    width: 14,
    height: 14,
  },
  leftPress: {
    marginRight: wp(10),
  },
});
