import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {
  checkMultiple,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

export async function CheckPermission() {
  return checkMultiple([
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ])
    .then(statuses => {
      if (
        statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.DENIED
      ) {
        return true;
      }
      if (statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.DENIED) {
        return true;
      }
    })
    .catch(error => {
      console.log('checkPermissionERR:', error);
    });
}

export async function requestCameraPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
}
export async function requestExternalWritePermission() {
  if (Platform.OS === 'android') {
    const config: any = {
      title: 'External Storage Write Permission',
      message: 'App needs write permission',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    };

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        config,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err: any) {
      console.warn(err);
      Alert.alert('Write permission err', err);
    }
    return false;
  } else {
    return true;
  }
}

export async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    try {
      let isPermit = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log('isPermit', isPermit);
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      return granted === PermissionsAndroid.RESULTS.GRANTED ? true : false;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log('result', result);
    return true;
  }
}
