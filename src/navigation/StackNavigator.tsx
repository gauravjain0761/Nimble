/* eslint-disable react/react-in-jsx-scope */
import {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import {screenName} from './screenNames';
import SplashScreen from '../screens/auth/SplashScreen';
import {NativeStackNavigationOptions} from 'react-native-screens/lib/typescript/native-stack/types';
import {
  AddCardScreen,
  AllProductScreen,
  CardScreen,
  CartScreen,
  CheckoutScreen,
  CreateSingScreen,
  EditProfile,
  EmailScreen,
  LoadingScreen,
  LocationScreen,
  LoginScreen,
  ManualLocationScreen,
  NeedHelpScreen,
  Onboarding,
  OrderConfirmation,
  OrdersStatusScreen,
  ProductDetails,
  SearchScreen,
  SearchStoreScreen,
  SelectService,
  SelfCheckoutScreen,
  StartCheckoutScreen,
  StoreListScreen,
  UpdateOrder,
} from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import StoreScreen from '../screens/store/StoreScreen';
import ImageClickScreen from '../screens/self-checkout/product-image-click/product-image-click';
import OrderConfirmationSelfCheckout from '../screens/self-checkout/order-confirm/order-confirm-self-checkout';
import SelfCheckout from '../screens/self-checkout/self-checkout/self-checkout';
import ReceiptScreen from '../screens/self-checkout/receipt-screen/receipt-screen';
import LoadingScreenSelfCheckout from '../screens/self-checkout/loading-screen-self-checkout/loadingScreen';
import BardcodeScanner from '../screens/self-checkout/product-bardcode-scan/product-barcode-scan';
import SelfCheckoutScreenPayment from '../screens/self-checkout/self-checkout-screen/self-checkout-screen-payment';
import ReviewOrder from '../screens/self-checkout/review-order/review-order';
import WebSocketComponent from '../screens/websocketScreen/websocket';

export type RootStackParamList = {
  SplashScreen: undefined;
  SignIn: undefined;
  IntroductionScreen: undefined;
  HomeScreen: undefined;
};
const options: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
  stackAnimation: 'slide_from_left',
};
const Stack = createStackNavigator<RootStackParamList>();

const LogoHeader = () => {
  return <Text>hi</Text>;
};

const StackNavigator: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={options}
      initialRouteName={screenName.SplashScreen}>
      <Stack.Screen name={screenName.SplashScreen} component={SplashScreen} />
      <Stack.Screen
        // @ts-ignore
        name={screenName.bottom_tab_navigator}
        component={BottomTabNavigator}
      />
      <Stack.Screen name={screenName.OnBoaring} component={Onboarding} />
      <Stack.Screen name={screenName.SelectService} component={SelectService} />
      <Stack.Screen
        name={screenName.LocationScreen}
        component={LocationScreen}
      />
      <Stack.Screen
        name={screenName.ManualLocationScreen}
        component={ManualLocationScreen}
      />
      <Stack.Screen name={screenName.LoadingScreen} component={LoadingScreen} />
      <Stack.Screen name={screenName.CartScreen} component={CartScreen} />
      <Stack.Screen
        name={screenName.ProductDetails}
        component={ProductDetails}
      />
      <Stack.Screen
        name={screenName.AllProductScreen}
        component={AllProductScreen}
      />
      <Stack.Screen name={screenName.SearchScreen} component={SearchScreen} />
      <Stack.Screen name={screenName.StoreScreen} component={StoreScreen} />
      <Stack.Screen
        name={screenName.CreateSingScreen}
        component={CreateSingScreen}
      />
      <Stack.Screen name={screenName.EmailScreen} component={EmailScreen} />
      <Stack.Screen name={screenName.CardScreen} component={CardScreen} />
      <Stack.Screen name={screenName.AddCardScreen} component={AddCardScreen} />
      <Stack.Screen
        name={screenName.CheckoutScreen}
        component={CheckoutScreen}
      />
      <Stack.Screen
        name={screenName.LoadingScreenSelfCheckout}
        component={LoadingScreenSelfCheckout}
      />
      <Stack.Screen
        name={screenName.SelfCheckoutScreenPayment}
        component={SelfCheckoutScreenPayment}
      />
      <Stack.Screen
        name={screenName.OrdersStatusScreen}
        component={OrdersStatusScreen}
      />
      <Stack.Screen name={screenName.ReviewOrder} component={ReviewOrder} />
      <Stack.Screen name={screenName.UpdateOrder} component={UpdateOrder} />
      <Stack.Screen
        name={screenName.Websocket}
        component={WebSocketComponent}
      />
      <Stack.Screen
        name={screenName.OrderConfirmation}
        component={OrderConfirmation}
      />
      <Stack.Screen name={screenName.EditProfile} component={EditProfile} />
      <Stack.Screen name={screenName.LoginScreen} component={LoginScreen} />

      {/* Self Checkout */}
      <Stack.Screen
        name={screenName.StoreListScreen}
        component={StoreListScreen}
      />
      <Stack.Screen
        name={screenName.SearchStoreScreen}
        component={SearchStoreScreen}
      />
      <Stack.Screen
        name={screenName.StartCheckoutScreen}
        component={StartCheckoutScreen}
      />
      <Stack.Screen
        name={screenName.NeedHelpScreen}
        component={NeedHelpScreen}
      />
      <Stack.Screen
        name={screenName.ImageClickScreen}
        component={ImageClickScreen}
      />
      <Stack.Screen
        name={screenName.BardcodeScanner}
        component={BardcodeScanner}
      />
      <Stack.Screen
        name={screenName.OrderConfirmationSelfCheckout}
        component={OrderConfirmationSelfCheckout}
      />
      <Stack.Screen name={screenName.ReceiptScreen} component={ReceiptScreen} />
      <Stack.Screen
        name={screenName.SelfCheckoutScreen}
        component={SelfCheckoutScreen}
      />
    </Stack.Navigator>
  );
};
export default StackNavigator;
