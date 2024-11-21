import {Alert} from 'react-native';
import {navigationRef} from '../navigation/mainNavigator';
import Snackbar from 'react-native-snackbar';

export const emailCheck = (email: string) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(email) === false) {
    return false;
  } else {
    return true;
  }
};
export const numberCheck = (string: string) => {
  let reg = /^(?=.*[0-9]).+$/;
  return reg.test(string);
};

export const specialCarCheck = (string: string) => {
  let reg = /^(?=.*[!@#$%^&*()]).+$/;
  return reg.test(string);
};

export const UpperCaseCheck = (string: string) => {
  let reg = /^(?=.*[A-Z]).+$/;
  return reg.test(string);
};

export const nameCheck = (name: string) => {
  let reg = /^([a-zA-Z ]){2,30}$/;
  if (reg.test(name) === false) {
    return false;
  } else {
    return true;
  }
};

export const passwordCheck = (string: string) => {
  let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return reg.test(string);
};

//navigation reset event
export const resetNavigation = (name: string, params?: any) => {
  navigationRef.reset({
    index: 0,
    routes: [{name: name}],
  });
};

//getText string
export const getText = (text: string) => {
  return text;
};

//show success toast message
export const successToast = (message: string) => {
  const timeId = setTimeout(() => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'green',
    });
  }, 300);

  return () => clearTimeout(timeId);
};

//show error toast message
export const errorToast = (message: string) => {
  const timeId = setTimeout(() => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#ff0000',
    });
  }, 300);
  return () => clearTimeout(timeId);
};

//show info toast message
export const infoToast = (message: string) => {
  const timeId = setTimeout(() => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#000',
    });
  }, 300);

  return () => clearTimeout(timeId);
};

export const showAlert = (
  title: string,
  message: string,
  onPressOk: () => void,
) => {
  Alert.alert(title, message, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => onPressOk(),
    },
  ]);
};
