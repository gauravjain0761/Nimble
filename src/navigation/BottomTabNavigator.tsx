import React, {useEffect, useState} from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';

import Categories from '../screen/dashBoard/Categories';
import Businesses from '../screen/dashBoard/Businesses';
import MyShopping from '../screen/dashBoard/MyShopping';
import Profile from '../screen/dashBoard/Profile';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icons} from '../assets';
import {colors} from '../theme/colors';
import {commonFontStyle, hp, wp} from '../theme/fonts';
import {screenName} from './screenNames';
import {
  Account,
  HomeScreen,
  MyCartScreen,
  Notification,
  OrdersScreen,
  SearchScreen,
  WishlistScreen,
} from '../screens';
import {useAppSelector} from '../redux/hooks';
import {createStackNavigator} from '@react-navigation/stack';
import {storeData} from '../utils/dummyData';

const Tab = createBottomTabNavigator();

const getIcons = (key: number) => {
  switch (key) {
    case 0:
      return Icons.home;
    case 1:
      return Icons.wishlist;
    case 2:
      return Icons.myCart;
    case 3:
      return Icons.notification;
    case 4:
      return Icons.account;
    default:
      break;
  }
};

const getText = (key: number) => {
  switch (key) {
    case 0:
      return 'Home';
    case 1:
      return 'Wishlist';
    case 2:
      return 'My Cart';
    case 3:
      return 'Orders';
    case 4:
      return 'Account';
    default:
      break;
  }
};

const TabBarItem = ({state, navigation}: BottomTabBarProps) => {
  // const { cartCount } = useAppSelector((state) => state.shopping);
  const [cartCount, setCartCount] = useState(0);
  const {data} = useAppSelector(state => state.product);

  useEffect(() => {
    const newCartData = associateProductsWithStores(storeData, data);
    setCartCount(newCartData.length);
  }, [data]);

  const associateProductsWithStores = (stores: any, products: any) => {
    return stores
      .map((store: any) => {
        const storeProducts = products.filter(
          (product: any) => product.storeID === store.id,
        );
        return {
          ...store,
          products: storeProducts.length > 0 ? storeProducts : undefined, // Set to undefined if no products
        };
      })
      .filter((store: any) => store.products); // Filter out stores with no products
  };

  return (
    <SafeAreaView style={styles.itemContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.itemViewContainer}>
            <Image
              source={getIcons(index)}
              resizeMode="contain"
              style={[
                styles.itemIconStyle,
                {
                  tintColor: isFocused
                    ? colors.secondaryPrimary
                    : colors.grey_96,
                },
              ]}
            />
            <Text
              numberOfLines={1}
              style={{
                ...styles.itemLabelTextStyle,
                color: isFocused ? colors.secondaryPrimary : colors.grey_96,
              }}>
              {getText(index)}
            </Text>
            {index === 2 ? (
              <>
                {cartCount > 0 && (
                  <View style={styles.countConatiner}>
                    <Text style={styles.countTextStyle}>{cartCount}</Text>
                  </View>
                )}
              </>
            ) : null}
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
};

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name={screenName.tabBarName.HomeScreen}
        component={HomeScreen}
      />
      <HomeStack.Screen
        name={screenName.SearchScreen}
        component={SearchScreen}
      />
    </HomeStack.Navigator>
  );
};

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <TabBarItem {...props} />}
      initialRouteName={screenName.tabBarName.HomeScreen}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 55,
        },
      }}>
      <Tab.Screen
        name={screenName.tabBarName.HomeScreen}
        component={HomeNavigator}
      />
      <Tab.Screen
        name={screenName.tabBarName.WishlistScreen}
        component={WishlistScreen}
      />
      <Tab.Screen
        name={screenName.tabBarName.MyCartScreen}
        component={MyCartScreen}
      />
      <Tab.Screen
        name={screenName.tabBarName.Orders}
        component={OrdersScreen}
      />
      <Tab.Screen name={screenName.tabBarName.Account} component={Account} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  itemIconStyle: {
    height: hp(24),
    width: wp(24),
    resizeMode: 'contain',
  },
  itemLabelTextStyle: {
    ...commonFontStyle(700, 10, colors.black),
    marginTop: hp(5),
  },
  itemContainer: {
    height: hp(65),
    borderTopWidth: hp(0.5),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    borderTopColor: colors.borderGreyLight,
  },
  itemViewContainer: {
    flex: 1,
    height: hp(60),
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? hp(30) : 0,
  },
  countConatiner: {
    top: hp(7),
    width: wp(20),
    right: wp(16),
    height: wp(20),
    position: 'absolute',
    alignItems: 'center',
    borderRadius: wp(10),
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  countTextStyle: {
    ...commonFontStyle(400, 10, colors.black),
  },
});

export default BottomTabNavigator;
