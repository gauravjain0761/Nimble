import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, {FC} from 'react';
import {useAppSelector} from '../redux/hooks';
import StackNavigator from './StackNavigator';
import {StatusBar} from 'react-native';
import {colors} from '../theme/colors';
import Loader from '../components/common/Loader';

export const navigationRef = createNavigationContainerRef();

const RootContainer: FC = () => {
  const {isLoading} = useAppSelector(state => state.common);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <Loader visible={isLoading} />
      <StackNavigator />
    </NavigationContainer>
  );
};
export default RootContainer;