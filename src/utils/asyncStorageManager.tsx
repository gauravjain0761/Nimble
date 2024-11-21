import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncKeys = {
  // clear in logout time
  token: '@token',
  user_info: '@user_info',
  user_onboarding: '@user_onboarding',
  user_listData: '@user_listData',

  // no clear in logout time
  fcm_token: '@fcm_token',
};

//clear asyncStorage
export const clearAsync = async () => {
  await AsyncStorage.multiRemove([asyncKeys.token, asyncKeys.user_info]);
};

//set token asyncStorage
export const setAsyncToken = async (token: string) => {
  await AsyncStorage.setItem(asyncKeys.token, JSON.stringify(token));
};

//get token asyncStorage
export const getAsyncToken = async () => {
  const token = await AsyncStorage.getItem(asyncKeys.token);
  if (token) {
    return JSON.parse(token);
  } else {
    return null;
  }
};

//set onboarding asyncStorage
export const setAsyncUserOnboarding = async (user: any) => {
  await AsyncStorage.setItem(asyncKeys.user_onboarding, JSON.stringify(user));
};

//get onboarding asyncStorage
export const getAsyncUserOnboarding = async () => {
  const userInfo = await AsyncStorage.getItem(asyncKeys.user_onboarding);
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return null;
  }
};
