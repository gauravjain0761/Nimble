import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../theme/colors';
import {Header, Input, PrimaryButton} from '../../../components/common';
import {commonFontStyle, hp, wp} from '../../../theme/fonts';
import {addressList} from '../../../utils/dummyData';
import {screenName} from '../../../navigation/screenNames';
import {useKeyboard} from '../../../utils/useKeyboard';

const SearchStoreScreen = ({route, navigation}: any) => {
  const {} = route?.params || {};
  const [valueText, setValueText] = useState('');
  const {keyboardVisible} = useKeyboard();

  const onPressSubmit = () => {
    navigation.navigate(screenName.StoreListScreen, {type: 'store'});
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header showLogo showLeftIcon />
      <View style={styles.container}>
        <Text style={styles.content}>{'Pick your store.'}</Text>
        <Text style={styles.contentText}>
          {'Type the name or address of the \nstore you’re in.'}
        </Text>
        <Input
          value={valueText}
          onChangeText={text => {
            setValueText(text);
          }}
          showDropDown={true}
          dropDownData={addressList}
          dropDownKey={'value'}
        />
      </View>
      {!keyboardVisible && (
        <View style={styles.btnStyle}>
          <PrimaryButton title={'Submit'} type="fill" onPress={onPressSubmit} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchStoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    ...commonFontStyle(700, 24, colors.black),
    textAlign: 'center',
    paddingHorizontal: wp(61),
    marginTop: hp(60),
  },
  contentText: {
    ...commonFontStyle(400, 16, colors.black),
    marginBottom: hp(40),
    marginTop: hp(10),
    textAlign: 'center',
  },
  btnStyle: {
    marginHorizontal: hp(50),
    flex: 0.3,
  },
});
