import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from './apiConstants';
import {clearAsync} from './asyncStorageManager';
import {navigationRef} from '../navigation/mainNavigator';
import {screenName} from '../navigation/screenNames';
import {infoToast} from './commonFunction';

interface makeAPIRequestProps {
  method?: any;
  url?: any;
  data?: any;
  headers?: any;
  params?: any;
}

export const makeAPIRequest = ({
  method,
  url,
  data,
  headers,
  params,
}: makeAPIRequestProps) =>
  new Promise((resolve, reject) => {
    const option = {
      method,
      baseURL: api.BASE_URL,
      url,
      data,
      headers,
      params,
    };
    axios(option)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        if (error?.response?.status === 401) {
          clearAsync(); //clear asyncStorage
          navigationRef?.current?.reset({
            index: 1,
            routes: [{name: screenName.SplashScreen}],
          });
        } else {
          console.log('Something went wrong, please try again.');

          // infoToast('Something went wrong, please try again.');
        }
        reject(error);
      });
  });
