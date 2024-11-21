import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {Icons} from '../../assets';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {Header, Input, PrimaryButton} from '../../components/common';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';
import {useAppDispatch} from '../../redux/hooks';
import {
  onSaveName,
  onSavePassword,
  onSendOtp,
  onVerifyOtp,
} from '../../action/authAction';
import {
  emailCheck,
  errorToast,
  infoToast,
  numberCheck,
  specialCarCheck,
  successToast,
  UpperCaseCheck,
} from '../../utils/commonFunction';
import CustomInput from '../../components/custom-input/custom-input';

const EmailScreen = ({route}: any) => {
  const {type} = route?.params || {};
  const dispatch = useAppDispatch();

  const [valueText, setValueText] = useState('');
  const {params} = useRoute();
  const isFocused = useIsFocused();
  const [selectIndex, setSelectIndex] = useState(1);
  const [otpScreen, setOtpScreen] = useState(false);
  const [email, setEmail] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowPass, setIsShowPass] = useState<boolean>(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const sendCode = async () => {
    if (email.trim().length === 0) {
      infoToast('Please enter your email address');
    } else if (!emailCheck(email)) {
      infoToast('Please enter your v@alid email address');
    } else {
      let UserInfo = {
        data: {
          email: email.toLowerCase(),
        },
        onSuccess: (res: any) => {
          setOtpScreen(true);
        },
        onFailure: (Err: any) => {
          console.log('Err', Err);
          if (Err !== undefined) {
            errorToast(Err?.data?.message);
          }
        },
      };
      dispatch(onSendOtp(UserInfo));
    }
  };

  const verifyCode = async () => {
    if (otpValue.trim().length === 0) {
      infoToast('Please enter code');
    } else {
      let UserInfo = {
        data: {
          email: email.toLowerCase(),
          code: otpValue,
        },
        onSuccess: (res: any) => {
          setSelectIndex(2);
          setOtpScreen(false);
        },
        onFailure: (Err: any) => {
          console.log('Err', Err);
          if (Err !== undefined) {
            errorToast(Err?.data?.message);
          }
        },
      };
      dispatch(onVerifyOtp(UserInfo));
    }
  };

  const onSubmit = async () => {
    if (userName.trim().length === 0) {
      infoToast('Please enter your name');
    } else if (password.trim().length === 0) {
      infoToast('Please enter your password');
    } else if (password.trim().length < 9) {
      infoToast('Your password must be at least 9 characters long');
    } else if (!numberCheck(password)) {
      infoToast('Password must contain one number');
    } else if (!specialCarCheck(password)) {
      infoToast('Password must contain one special character');
    } else if (!UpperCaseCheck(password)) {
      infoToast('Password must contain one uppercase letter');
    } else if (password !== cPassword) {
      infoToast('Password and confirm password does not match');
    } else {
      let UserInfo = {
        data: {
          email: email.toLowerCase(),
          name: userName,
        },
        onSuccess: (res: any) => {
          onLoginSubmit();
        },
        onFailure: (Err: any) => {
          console.log('Err', Err);
          if (Err !== undefined) {
            errorToast(Err?.data?.message);
          }
        },
      };
      dispatch(onSaveName(UserInfo));
    }
  };

  const onLoginSubmit = () => {
    let UserInfo = {
      data: {
        email: email.toLowerCase(),
        password: password,
      },
      onSuccess: (res: any) => {
        console.log('res', res);
        successToast('Account created successfully');
        // if (type === 'forgot-pass' || type === 'sign-up') {
        navigationRef.navigate(screenName.LoginScreen);
        setSelectIndex(1);
        // } else {
        //   setSelectIndex(1);
        //   navigationRef.navigate(screenName.CardScreen);
        // }
      },
      onFailure: (Err: any) => {
        console.log('Err', Err);
        if (Err !== undefined) {
          errorToast(Err?.data?.message);
        }
      },
    };
    dispatch(onSavePassword(UserInfo));
  };

  return (
    <SafeAreaView style={[AppStyles.flex, styles.container]}>
      <Header showLogo={true} showLeftIcon />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {selectIndex === 1 && (
          <View style={styles.logo_container}>
            {otpScreen ? (
              <Input
                label={`Enter the verification code we just sent to ${email}`}
                value={otpValue}
                onChangeText={text => setOtpValue(text.trim())}
                labelStyle={styles.labelStyle}
              />
            ) : (
              <>
                {/* {type === 'forgot-pass' ? null : (
                <Input
                  label="Please enter your name."
                  value={userName}
                  onChangeText={text => setUserName(text)}
                  labelStyle={styles.labelStyle}
                />
              )} */}

                <Input
                  value={email}
                  onChangeText={text => setEmail(text.trim())}
                  label="What is your email address?"
                  labelStyle={styles.labelStyle}
                />
              </>
            )}
          </View>
        )}
        {/* {selectIndex === 2 && (
        <View style={styles.logo_container}>
          <Text style={styles.content}>{'Please enter your name.'}</Text>
          <Input value={userName} onChangeText={text => setUserName(text)} />
        </View>
      )} */}
        {selectIndex === 2 && (
          <View style={styles.logo_container}>
            {type === 'forgot-pass' ? null : (
              <Text style={styles.content1}>{'Welcome, John!'}</Text>
            )}
            <Text style={styles.content2}>
              {'Create a password for your account'}
            </Text>
            {type === 'forgot-pass' ? null : (
              <Input
                placeholder="Enter your name"
                value={userName}
                onChangeText={text => setUserName(text.trim())}
                labelStyle={styles.labelStyle}
                placeholderTextColor={colors.grey_40}
              />
            )}
            <Input
              value={password}
              onChangeText={text => setPassword(text.trim())}
              showDropDown={false}
              placeholder={
                type === 'forgot-pass' ? 'New Password' : 'Enter Password'
              }
              secureTextEntry={!isShowPassword}
              rightIcon={!isShowPassword ? Icons.eyeOn : Icons.eyeOff}
              onPressRightIcon={() => setIsShowPassword(!isShowPassword)}
              placeholderTextColor={colors.grey_40}
            />

            {/* <View style={{height: 18}} /> */}
            <Input
              value={cPassword}
              onChangeText={text => setCPassword(text.trim())}
              showDropDown={false}
              placeholder="Confirm Password"
              placeholderTextColor={colors.grey_40}
              secureTextEntry={!isShowPass}
              rightIcon={!isShowPass ? Icons.eyeOn : Icons.eyeOff}
              onPressRightIcon={() => setIsShowPass(!isShowPass)}
            />
          </View>
        )}
      </ScrollView>
      {/* {isKeyboardVisible ? null : ( */}
      <View style={styles.buttonContainer}>
        {selectIndex === 1 ? (
          <PrimaryButton
            type="fill"
            title="Next"
            onPress={() => {
              if (otpScreen) {
                verifyCode();
              } else {
                sendCode();
              }
            }}
            style={styles.button}
          />
        ) : selectIndex === 2 ? (
          <PrimaryButton
            type="fill"
            title={'Submit'}
            onPress={() => {
              onSubmit();
            }}
            style={styles.button}
          />
        ) : (
          <PrimaryButton
            type="fill"
            title={
              type === 'forgot-pass' || type === 'sign-up' ? 'Submit' : 'Next'
            }
            onPress={() => {
              // if (type === 'forgot-pass') {
              navigationRef.navigate(screenName.LoginScreen);
              setSelectIndex(1);
              // } else {
              //   setSelectIndex(1);
              //   navigationRef.navigate(screenName.CardScreen);
              // }
            }}
            style={styles.button}
          />
        )}
        {otpScreen && (
          <PrimaryButton
            type="outline"
            title="I can’t find it. Send again"
            onPress={() => {
              setOtpValue('');
              sendCode();
            }}
            style={styles.button1}
          />
        )}
        {otpScreen && (
          <TouchableOpacity
            onPress={() => {
              setOtpScreen(false);
            }}>
            <Text style={styles.useEmail}>{'Use a different email'}</Text>
          </TouchableOpacity>
        )}

        {type === 'forgot-pass'
          ? null
          : !otpScreen && (
              <View style={{flexDirection: 'row', gap: 5, alignSelf: 'center'}}>
                {[1, 2].map(item => {
                  return (
                    <View
                      style={[
                        styles.dotView,
                        {
                          backgroundColor:
                            item === selectIndex
                              ? colors.secondaryPrimary
                              : colors.grey_D9,
                        },
                      ]}
                    />
                  );
                })}
              </View>
            )}
      </View>
      {/* )} */}
    </SafeAreaView>
  );
};

export default EmailScreen;

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
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  logo_container: {
    flex: 1,
    // marginTop: hp(60),
    gap: 15,
  },
  content: {
    ...commonFontStyle(600, 20, colors.black),
    textAlign: 'center',
    paddingHorizontal: wp(61),
    // marginTop: hp(60),
    marginBottom: hp(10),
  },
  content1: {
    ...commonFontStyle(600, 20, colors.black),
    textAlign: 'center',
    paddingHorizontal: wp(61),
    marginTop: hp(12),
  },
  content2: {
    ...commonFontStyle(600, 20, colors.black),
    textAlign: 'center',
    paddingHorizontal: wp(61),
    marginTop: hp(10),
    marginBottom: hp(50),
  },
  buttonContainer: {
    alignSelf: 'center',
    gap: hp(16),
    marginBottom: hp(20),
  },
  button: {
    paddingHorizontal: wp(90),
  },
  button1: {
    paddingHorizontal: wp(30),
  },
  dotView: {
    width: wp(8),
    height: hp(8),
    borderRadius: wp(8) / 2,
  },
  useEmail: {
    ...commonFontStyle(600, 16, colors.grey_45),
    textAlign: 'center',
    marginTop: 2,
  },
  labelStyle: {
    textAlign: 'center',
    paddingHorizontal: wp(61),
    marginBottom: hp(12),
    paddingTop: hp(12),
  },
});
