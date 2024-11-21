import {Dimensions, Platform} from 'react-native';
import {navigationRef} from '../navigation/mainNavigator';
import {CommonActions} from '@react-navigation/native';

//navigation dispatch
export const dispatchNavigation = (name: string, params: any) => {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: name, params: params}],
    }),
  );
};
