/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {Icons} from '../../assets';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {useRoute} from '@react-navigation/native';
import {Header, PrimaryButton} from '../../components/common';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';
import {useAppDispatch} from '../../redux/hooks';
import CustomInput from '../../components/custom-input/custom-input';
import {errorToast, infoToast} from '../../utils/commonFunction';
import {onAddCard} from '../../action/cartAction';
const IconBtnText = ({icon, leftIcon, leftIconStyle, onPress}: any) => {
  return (
    <TouchableOpacity style={styles.btnView} onPress={onPress}>
      {leftIcon ? (
        <Image source={leftIcon} style={[styles.leftIcon, leftIconStyle]} />
      ) : (
        <Text style={styles.btnText}>Add New Card</Text>
      )}
      <Image source={icon} style={styles.ic_right} />
    </TouchableOpacity>
  );
};

const AddCardScreen = () => {
  const {params} = useRoute();

  const dispatch = useAppDispatch();

  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const onSubmit = () => {
    if (cardNumber === '') {
      infoToast('Please enter card number');
      return;
    } else if (cvc === '') {
      infoToast('Please enter cvc');
      return;
    } else if (expiry === '') {
      infoToast('Please enter expiry');
      return;
    } else if (postalCode === '') {
      infoToast('Please enter postal code');
      return;
    }
    let UserInfo = {
      data: {
        cardNumber: cardNumber,
        cvc: cvc,
        expiryDate: expiry,
      },
      onSuccess: (res: any) => {
        console.log('res', res);
        setCardNumber('');
        setCvc('');
        setExpiry('');
        setPostalCode('');

        navigationRef.goBack();
      },
      onFailure: (Err: any) => {
        console.log('Err', Err);
        if (Err !== undefined) {
          errorToast(Err?.data?.message);
        }
      },
    };
    dispatch(onAddCard(UserInfo));
  };

  return (
    <SafeAreaView style={[AppStyles.flex, styles.container]}>
      <View style={styles.logo_container}>
        <Header showLeftIcon={true} title={'Add Card'} />
        <View style={{margin: 24}}>
          <CustomInput
            leftIcon={Icons.ic_card}
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="Card Number"
            maxLength={19}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 60,
              gap: 10,
            }}>
            <CustomInput
              value={expiry}
              onChangeText={setExpiry}
              placeholder="MM/YY"
              maxLength={5}
              style={{flex: 1}}
            />
            <CustomInput
              value={cvc}
              onChangeText={setCvc}
              placeholder="CVC"
              maxLength={3}
              style={{flex: 1}}
            />
            <CustomInput
              value={postalCode}
              onChangeText={setPostalCode}
              placeholder="Postal Code"
              maxLength={5}
              style={{flex: 1}}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            type="fill"
            title="Save Payment"
            onPress={() => {
              onSubmit();
              // navigationRef.navigate(screenName.EmailScreen);
            }}
            style={styles.button}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Image source={Icons.ic_lock} style={styles.ic_lock} />
          <Text style={styles.ic_lockText}>
            Your payment information is secured with encryption.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddCardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  logo: {
    width: wp(140),
    height: hp(100),
    alignSelf: 'center',
  },
  logo_container: {},
  content: {
    ...commonFontStyle(600, 20, colors.black),
    textAlign: 'center',
    paddingHorizontal: wp(61),
    marginTop: hp(10),
  },
  location: {
    width: '100%',
    height: hp(163),
    marginTop: hp(40),
  },
  buttonContainer: {
    alignSelf: 'center',
    gap: hp(16),
    marginBottom: hp(20),
  },
  button: {
    paddingHorizontal: wp(92),
  },
  btnView: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    borderColor: colors.grey_30,
    height: 52,
  },
  btnText: {
    ...commonFontStyle(600, 16, colors.black),
  },
  labelText: {
    ...commonFontStyle(600, 20, colors.black),
    marginBottom: 10,
  },
  ic_right: {
    width: 12,
    height: 12,
  },
  ic_lock: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  ic_lockText: {
    ...commonFontStyle(600, 12, colors.grey_50),
    marginLeft: 7,
  },
  ic_card: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  inputStyle: {
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: colors.grey_30,
    height: 52,
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: 18,
  },
  inputStyle1: {
    ...commonFontStyle(700, 16, colors.grey_40),
    flex: 1,
    height: 50,
  },
});
