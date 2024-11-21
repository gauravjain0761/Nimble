import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {InputProps, PrimaryButtonProps} from '../../utils/types';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, SCREEN_HEIGHT, wp} from '../../theme/fonts';

const Input: FC<InputProps> = ({
  style,
  titleStyle,
  value,
  onChangeText,
  showDropDown = false,
  placeholder,
  placeholderTextColor,
  label,
  labelStyle,
  dropDownData = [],
  dropDownKey,
  rightIcon,
  onPressRightIcon,
  secureTextEntry,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <View>
      {label && (
        <Text style={{...styles.labelStyle, ...labelStyle}}>{label}</Text>
      )}
      <View style={styles.mainView}>
        <TextInput
          value={value}
          onChangeText={(text: string) => {
            onChangeText(text);
            setIsFocus(false);
          }}
          style={styles.inputStyle}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onPressRightIcon} style={styles.rightIcon}>
            <Image
              source={rightIcon}
              style={styles.ic_right}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {!isFocus && showDropDown && value.length > 2 ? (
        <View style={styles.dropDownStyle}>
          <FlatList
            data={dropDownData}
            renderItem={({item, index}: any) => (
              <TouchableOpacity
                style={styles.listView}
                onPress={() => {
                  setIsFocus(true);
                  onChangeText(item[dropDownKey] || 'Brooklyn, NY 11282');
                  setSelectedIndex(index);
                }}>
                <Text
                  // numberOfLines={1}
                  style={{
                    ...styles.listText,
                    color:
                      selectedIndex === index
                        ? colors.secondaryPrimary
                        : colors.grey_50,
                  }}>
                  {item[dropDownKey] || 'Brooklyn, NY 11282'}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  mainView: {
    borderRadius: wp(8),
    width: '75%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(50),
    backgroundColor: colors.inputBack,
    paddingHorizontal: 12,
    ...commonFontStyle(600, 16, colors?.black),
  },
  inputStyle: {
    ...commonFontStyle(600, 16, colors?.black),
    flex: 1,
  },
  dropDownStyle: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.062,
    borderWidth: 1,
    alignSelf: 'center',
    width: '75%',
    height: SCREEN_HEIGHT / 3.5,
    borderColor: colors.grey_20,
  },
  listText: {
    ...commonFontStyle(600, 16, colors?.grey_50),
  },
  listView: {
    borderTopWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderTopColor: colors.grey_20,
    zIndex: 1,
  },
  labelStyle: {
    ...commonFontStyle(600, 20, colors.black),
    marginBottom: hp(8),
  },
  ic_right: {
    width: 20,
    height: 20,
  },
  rightIcon: {
    position: 'absolute',
    right: 10,
  },
});
