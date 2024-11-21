import SelectService from './service/SelectService';
import LocationScreen from './location/LocationScreen';
import ManualLocationScreen from './location/ManualLocationScreen';
import LoadingScreen from './location/LoadingScreen';
import Onboarding from './onboarding/onBoarding';

//tab
import HomeScreen from './Home/HomeScreen';
import WishlistScreen from './wishlist/WishlistScreen';
import MyCartScreen from './myCart/MyCartScreen';
import OrdersScreen from './orders/OrdersScreen';
import Notification from './notification/Notification';
import Account from './account/Account';

//cart
import CheckoutScreen from './myCart/CheckoutScreen';
import CartScreen from './myCart/CartScreen';
import ProductDetails from './myCart/ProductDetails';
import AllProductScreen from './myCart/all-product/all-product';

//search
import SearchScreen from './search/SearchScreen';

//auth
import CreateSingScreen from './auth/CreateSingScreen';
import EmailScreen from './auth/EmailScreen';
import LoginScreen from './auth/login-screen/login-screen';

//order
import CardScreen from './orders/CardScreen';
import OrdersStatusScreen from './orders/OrdersStatusScreen';
import AddCardScreen from './orders/AddCardScreen';
import UpdateOrder from './orders/update-order/UpdateOrder';
import OrderConfirmation from './orders/OrderConfirmation';
import EditProfile from './account/edit-profile/edit-profile';

// Self-checkout
import StoreListScreen from './self-checkout/store-list/store-list-screen';
import SearchStoreScreen from './self-checkout/search-store/search-store-screen';
import StartCheckoutScreen from './self-checkout/start-checkout-screen/start-checkout-screen';
import NeedHelpScreen from './self-checkout/need-help/need-help-screen';
import SelfCheckoutScreen from './self-checkout/self-checkout/self-checkout';
import OrderConfirmationSelfCheckout from './self-checkout/order-confirm/order-confirm-self-checkout';

export {
  HomeScreen,
  SelectService,
  LocationScreen,
  Onboarding,
  ManualLocationScreen,
  LoadingScreen,
  WishlistScreen,
  MyCartScreen,
  Notification,
  Account,
  CartScreen,
  ProductDetails,
  SearchScreen,
  OrdersScreen,
  CreateSingScreen,
  EmailScreen,
  CardScreen,
  AddCardScreen,
  CheckoutScreen,
  OrdersStatusScreen,
  UpdateOrder,
  OrderConfirmation,
  EditProfile,
  LoginScreen,
  AllProductScreen,
  StoreListScreen,
  SearchStoreScreen,
  StartCheckoutScreen,
  NeedHelpScreen,
  SelfCheckoutScreen,
  OrderConfirmationSelfCheckout,
};
