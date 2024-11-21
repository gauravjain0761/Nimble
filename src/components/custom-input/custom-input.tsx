import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {commonFontStyle} from '../../theme/fonts';
import {colors} from '../../theme/colors';

interface InputProps {
  label?: string;
  style?: any;
  editable?: boolean;
  keyboardAppearance?: 'light' | 'dark';
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'number-pad';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  placeholder?: string;
  defaultValue?: string;
  multiline?: boolean;
  numberOfLines?: number;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  maxLength?: number;
  secureTextEntry?: boolean;
  value?: string;
  leftIcon?: any;
  rightIcon?: any;
  isError?: boolean;
  error?: string;
  isConvertible?: boolean;
  onChangeText?: any;
  onChange?: any;
  onKeyPress?: any;
  autoFocus?: boolean;
  onEndEditing?: any;
  bgColor?: string;
  info?: string;
  borderBottomWidth?: number;
  inputStyle?: any;
  onPressRightIcon?: () => void;
  onPressLeftIcon?: () => void;
}

const CustomInput = ({
  label = '',
  style = {},
  editable = true,
  keyboardAppearance = 'light',
  keyboardType = 'default',
  returnKeyType = 'done',
  placeholder = '',
  defaultValue = '',
  multiline = false,
  numberOfLines = 1,
  textAlignVertical = 'center',
  maxLength = 10000,
  secureTextEntry = false,
  value,
  onChangeText,
  onChange,
  onKeyPress,
  autoFocus,
  onEndEditing,
  inputStyle,
  error,
  rightIcon,
  onPressRightIcon,
  leftIcon,
  onPressLeftIcon,
}: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          {borderColor: isFocus ? colors.secondaryPrimary : colors.grey_10},
          style,
        ]}>
        {leftIcon && (
          <TouchableOpacity onPress={onPressLeftIcon} style={styles.rightIcon}>
            <Image
              source={leftIcon}
              style={styles.leftIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={[styles.input, inputStyle]}
          cursorColor={colors.secondaryPrimary}
          placeholderTextColor={colors.grey_99}
          placeholder={isFocus ? '' : placeholder}
          editable={editable}
          keyboardAppearance={keyboardAppearance}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={textAlignVertical}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          defaultValue={defaultValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value}
          onChangeText={onChangeText}
          onChange={onChange}
          onKeyPress={onKeyPress}
          autoFocus={autoFocus}
          onEndEditing={onEndEditing}
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
      {error?.trim() !== '' && (
        <Text style={styles.error}>{error?.trim()}</Text>
      )}
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    ...commonFontStyle(400, 16, colors.black),
    marginBottom: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.grey_10,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 52,
  },
  input: {
    ...commonFontStyle(400, 16, colors.black),
    flex: 1,
  },
  error: {
    ...commonFontStyle(400, 14, colors.red),
    marginTop: 5,
  },
  ic_right: {
    width: 20,
    height: 20,
  },
  leftIcon: {
    width: 30,
    height: 30,
  },
});
