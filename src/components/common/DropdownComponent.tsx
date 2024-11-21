//import liraries
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {DropdownComponentProps} from '../../utils/types';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {Icons} from '../../assets';

const DropdownComponent = ({
  onBlur,
  onFocus,
  label,
  data,
  setValue,
  value,
  placeholder,
  containerStyle,
  renderLeftIcon,
  labelField = 'value',
  valueField = 'value',
  dropDownStyle,
  search = true,
}: DropdownComponentProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Dropdown
        search={search}
        style={[
          styles.dropdown,
          dropDownStyle,
          isFocus && {borderColor: colors.grey},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        renderLeftIcon={() => {
          return renderLeftIcon ? (
            <Image
              source={renderLeftIcon}
              style={styles.leftIcon}
              resizeMode="contain"
            />
          ) : null;
        }}
        renderRightIcon={() => {
          return (
            <Image
              source={Icons.down}
              style={styles.renderRightIcon}
              resizeMode="contain"
            />
          );
        }}
        placeholder={!isFocus ? placeholder : ''}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => {
          setIsFocus(true);
          if (onFocus) {
            onFocus();
          }
        }}
        onBlur={() => {
          setIsFocus(false);
          if (onBlur) {
            onBlur();
          }
        }}
        onChange={(item: any) => {
          setValue(item.label);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: hp(25),
  },
  dropdown: {
    height: hp(32),
    borderRadius: 20,
    marginTop: hp(5),
    backgroundColor: colors.white,
    paddingHorizontal: wp(10),
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
  },
  placeholderStyle: {
    ...commonFontStyle(400, 14, colors.borderGreyLight),
  },
  selectedTextStyle: {
    ...commonFontStyle(400, 12, colors.secondaryPrimary),
  },
  renderRightIcon: {
    width: wp(12),
    height: wp(12),
    resizeMode: 'contain',
  },
  leftIcon: {
    width: wp(20),
    height: wp(15),
    resizeMode: 'contain',
    marginRight: 2,
  },
  inputSearchStyle: {
    height: hp(35),
    ...commonFontStyle(400, 14, colors.secondaryPrimary),
  },
  labelTextStyle: {
    ...commonFontStyle(400, 14, colors.secondaryPrimary),
    marginBottom: hp(5),
  },
  itemTextStyle: {
    ...commonFontStyle(400, 14, colors.black),
  },
});

export default DropdownComponent;
