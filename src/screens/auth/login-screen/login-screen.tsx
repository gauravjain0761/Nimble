import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {colors} from '../../../theme/colors';
import {Header, PrimaryButton} from '../../../components/common';
import {Icons} from '../../../assets';
import {commonFontStyle, hp, wp} from '../../../theme/fonts';
import CustomInput from '../../../components/custom-input/custom-input';
import {navigationRef} from '../../../navigation/mainNavigator';
import {screenName} from '../../../navigation/screenNames';
import {useAppDispatch} from '../../../redux/hooks';
import {onLogin} from '../../../action/authAction';
import {
  emailCheck,
  errorToast,
  infoToast,
  numberCheck,
  specialCarCheck,
  successToast,
  UpperCaseCheck,
} from '../../../utils/commonFunction';
import {USER_DATA, USER_LOGIN} from '../../../redux/actionTypes';

const LoginScreen: FC = ({navigation, route}: any) => {
  const {type, cartItem, isFrom} = route.params || {};
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>(__DEV__ ? 'abc@yopmail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? 'Test@1234' : '');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);

  console.log('isFrom', isFrom);

  const onLoginSubmit = () => {
    if (email.trim().length === 0) {
      infoToast('Please enter your email address');
    } else if (!emailCheck(email)) {
      infoToast('Please enter your valid email address');
    } else if (password.trim().length === 0) {
      infoToast('Please enter your password');
      // } else if (password.trim().length < 9) {
      //   infoToast('Your password must be at least 9 characters long');
      // } else if (!numberCheck(password)) {
      //   infoToast('Password must contain one number');
      // } else if (!specialCarCheck(password)) {
      //   infoToast('Password must contain one special character');
      // } else if (!UpperCaseCheck(password)) {
      //   infoToast('Password must contain one uppercase letter');
    } else {
      let UserInfo = {
        data: {
          email: email.toLowerCase(),
          password: password,
        },
        onSuccess: data => {
          dispatch({
            type: USER_DATA,
            payload: {email: email.toLowerCase()},
          });
          setEmail('');
          setPassword('');
          setIsShowPassword(false);
          dispatch({type: USER_LOGIN, payload: true});
          if (isFrom === 'checkout') {
            navigationRef.goBack();
          } else if (type === 'cart') {
            navigation.replace(screenName.CardScreen, {cartItem: cartItem});
            successToast('Login successfully');
          } else {
            navigationRef.resetRoot({
              index: 0,
              routes: [{name: screenName.bottom_tab_navigator}],
            });
            successToast('Login successfully');
          }
        },
        onFailure: (Err: any) => {
          if (Err !== undefined) {
            console.log(Err?.data?.message);
          }
        },
      };
      dispatch(onLogin(UserInfo));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showLogo={true} showLeftIcon />
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.headingText}>{'Sign In'}</Text>
        <CustomInput
          label={'Email'}
          placeholder={'Enter Email'}
          keyboardType={'email-address'}
          onChangeText={(t: string) => setEmail(t.trim())}
          value={email}
        />
        <CustomInput
          label={'Password'}
          placeholder={'Enter Password'}
          keyboardType={'default'}
          onChangeText={(t: any) => setPassword(t.trim())}
          value={password}
          secureTextEntry={isShowPassword}
          rightIcon={isShowPassword ? Icons.eyeOn : Icons.eyeOff}
          onPressRightIcon={() => setIsShowPassword(!isShowPassword)}
        />
        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => {
            navigationRef.navigate(screenName.EmailScreen, {
              type: type || 'forgot-pass',
            });
          }}>
          <Text style={styles.forgotText}>{'Forgot Password'}</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            type="fill"
            title={'Sign In'}
            onPress={() => {
              onLoginSubmit();
            }}
            style={styles.button}
          />

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>{"Don't have an account?"}</Text>
            <Text
              onPress={() => {
                navigationRef.navigate(screenName.EmailScreen, {
                  type: type || 'sign-up',
                });
              }}
              style={styles.createText}>
              {'Create one'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logo: {
    width: wp(140),
    height: hp(100),
    alignSelf: 'center',
  },
  mainContainer: {
    paddingHorizontal: wp(16),
  },
  headingText: {
    ...commonFontStyle(700, 24, colors.secondaryPrimary),
    textAlign: 'center',
    marginVertical: hp(20),
  },
  forgotContainer: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    ...commonFontStyle(400, 16, colors.secondaryPrimary),
    textAlign: 'right',
    marginVertical: hp(5),
  },
  buttonContainer: {
    marginTop: hp(38),
  },
  button: {
    paddingHorizontal: wp(70),
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(20),
  },
  signUpText: {
    ...commonFontStyle(400, 16, colors.secondaryPrimary),
  },
  createText: {
    ...commonFontStyle(600, 16, colors.secondaryPrimary),
    marginLeft: wp(5),
  },
});
