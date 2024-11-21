/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {colors} from '../../theme/colors';
import {Header} from '../../components/common';
import {Icons} from '../../assets';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {errorToast} from '../../utils/commonFunction';
import {onGetUser} from '../../action/accountAction';
import {USER_LOGOUT} from '../../redux/actionTypes';

interface ImageTextViewProps {
  image: any;
  title: string;
  tintColor?: string;
  color?: string;
  onPress?: () => void;
}

const ImageTextView = ({
  image,
  title,
  tintColor,
  color = colors.grey_99,
  onPress,
}: ImageTextViewProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.imageTextView}>
      <Image
        source={image}
        style={styles.imageStyle}
        resizeMode="contain"
        tintColor={tintColor}
      />
      <Text style={{...styles.titleText, color: color}}>{title}</Text>
    </TouchableOpacity>
  );
};

const Account: FC = ({navigation}: any) => {
  const {userData, isLogin} = useAppSelector(state => state.common);
  const dispatch = useAppDispatch();
  const [profileDetails, setProfileDetails] = useState({
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    image: Icons.account,
  });
console.log('userData',userData)
  const LogOut = () =>
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch({type: USER_LOGOUT});
          navigationRef.resetRoot({
            index: 0,
            routes: [{name: screenName.SelectService}],
          });
        },
      },
    ]);

  useEffect(() => {
    if (isLogin) {
      onGetUserData();
    }
  }, [isLogin]);

  const onGetUserData = () => {
    let UserInfo = {
      data: {
        email: userData.email,
      },
      onSuccess: (res: any) => {
        console.log('res', res);
        const _user = res.user;
        setProfileDetails({
          name: _user.name,
          email: _user.email,
          image: Icons.account,
        });
      },
      onFailure: (Err: any) => {
        console.log('Err', Err);
        if (Err !== undefined) {
          errorToast(Err?.data?.message);
        }
      },
    };
    dispatch(onGetUser(UserInfo));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Account'} />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileView}>
            <Image
              source={profileDetails.image}
              style={styles.user}
              resizeMode="contain"
              tintColor={colors.secondaryPrimary}
            />
          </View>
          {!isLogin && (
            <TouchableOpacity
              onPress={() => navigationRef.navigate(screenName.LoginScreen)}
              style={{paddingHorizontal: 16}}>
              <Text style={styles.loginText}>LOG IN</Text>
              <Text style={styles.userName}>{'to See account details'}</Text>
            </TouchableOpacity>
          )}
          {isLogin && (
            <View style={{marginLeft: 16}}>
              <Text style={styles.userName}>{profileDetails.name}</Text>
              <Text style={styles.email}>{profileDetails.email}</Text>
            </View>
          )}
        </View>
        {isLogin && (
          <View style={styles.bottomContainer}>
            <ImageTextView
              image={Icons.account}
              title={'Edit Profile'}
              tintColor={colors.secondaryPrimary}
              onPress={() => {
                navigationRef.navigate(screenName.EditProfile);
              }}
            />

            <ImageTextView
              image={Icons.logout}
              title={'Log Out'}
              tintColor={colors.red}
              color={colors.red}
              onPress={LogOut}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',

    borderColor: colors.grey_10,
  },
  profileView: {
    width: wp(60),
    height: hp(60),
    borderRadius: 60,
    backgroundColor: colors.grey_10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  user: {
    width: wp(25),
    height: hp(25),
  },
  userName: {
    ...commonFontStyle(600, 16, colors.black),
  },
  email: {
    ...commonFontStyle(500, 14, colors.grey_99),
  },
  bottomContainer: {
    padding: 16,
    gap: 20,
  },
  imageTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15,
  },
  imageStyle: {
    width: wp(20),
    height: hp(20),
  },
  titleText: {
    ...commonFontStyle(400, 16, colors.grey_99),
  },
  loginText: {
    ...commonFontStyle(600, 20, colors.secondaryPrimary),
  },
});
