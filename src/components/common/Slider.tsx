import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, Platform} from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {Icons} from '../../assets';
import {commonFontStyle, hp} from '../../theme/fonts';
import {colors} from 'react-native-swiper-flatlist/src/themes';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';
import CartItem from '../cart/CartItem';
import {useIsFocused} from '@react-navigation/native';

const SLIDER_WIDTH = 300;
const HANDLE_SIZE = 40;
const cartItem = [
  {
    id: 3,
    image: 109,
    name: 'Extra Large Eggs (18-pack)',
    price: '8.00',
    quantity: 4,
    storeID: 3,
  },
  {
    id: 2,
    image: 108,
    name: 'Dempster’s Gold Hamburger Buns (8-pack)',
    price: '4.00',
    quantity: 1,
    storeID: 3,
  },
];
const navigateToOrderConfirmation = ({cartItems}) => {
  if (Platform.OS === 'android') {
    navigationRef.navigate(screenName.SelfCheckoutScreenPayment, {
      cartItem: cartItems,
    });
  } else {
    navigationRef.navigate(screenName.LoadingScreenSelfCheckout, {
      headerText: 'Your order is being\nplaced...',
      cartItem: cartItem,
    });
  }
  // navigationRef.navigate(screenName.OrderConfirmationSelfCheckout);
};

const Slider = ({cartItems}) => {
  const offset = useSharedValue(0);
  const MAX_VALUE = SLIDER_WIDTH - HANDLE_SIZE - 10;
  const isFocused = useIsFocused();
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      offset.value = Math.min(
        Math.max(offset.value + event.translationX, 0),
        MAX_VALUE,
      );
    })
    .onEnd(() => {
      if (offset.value < MAX_VALUE * 0.9) {
        offset.value = withSpring(0);
      } else {
        offset.value = withSpring(MAX_VALUE, {}, () => {
          // Navigate only after animation completes
          runOnJS(navigateToOrderConfirmation)({cartItems});
        });
      }
    });

  const sliderHandleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });

  useEffect(() => {
    if (isFocused) {
      offset.value = withSpring(0);
    }
  }, [isFocused]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.sliderTrack}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.sliderHandle, sliderHandleStyle]}>
            <Image source={Icons.arrow_green} style={styles.arrow} />
          </Animated.View>
        </GestureDetector>
        <Text
          style={{
            position: 'absolute',
            alignSelf: 'center',
            ...commonFontStyle(600, hp(18), colors.white),
          }}>
          Slide to Check Out
        </Text>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  sliderTrack: {
    width: SLIDER_WIDTH,
    height: 50,
    backgroundColor: '#074F51',
    borderRadius: 25,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  sliderHandle: {
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    backgroundColor: '#f8f9ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {},
});

export default Slider;
