/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../theme/colors';
import {Header, PrimaryButton} from '../../components/common';
import {BottomModal, CartItemList} from '../../components';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {navigationRef} from '../../navigation/mainNavigator';
import {Icons} from '../../assets';
import {screenName} from '../../navigation/screenNames';
import MapModal from '../orders/map-modal/map-modal';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  addWishList,
  decQun,
  incQun,
  removeProduct,
} from '../../redux/action/productAction';

const TowTextView = ({title, value, style}: any) => {
  return (
    <View style={styles.towTextView}>
      <Text style={[styles.titleText, style]}>{title}</Text>
      <Text style={[styles.valueText, style]}>{value}</Text>
    </View>
  );
};

const CartScreen = ({navigation, route}: any) => {
  const {cartItem} = route.params || {};
  const {data} = useAppSelector(state => state.product);
  const {isLogin, time} = useAppSelector(state => state.common);

  const dispatch = useAppDispatch();
  const [modalBottom, setModalBottom] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const newProdData = data.filter(
        (item: any) => item.storeID === cartItem?.id,
      );
      setProductData(newProdData);
    }
  }, [cartItem.id, data]);

  const calculateStoreTotals = (products: any) => {
    return products.reduce(
      (acc: any, product: any) => {
        const price = parseFloat(product.price);
        acc.totalPrice += price * product.quantity; // Calculate total price
        acc.totalQuantity += product.quantity; // Calculate total quantity
        return acc;
      },
      {totalPrice: 0, totalQuantity: 0},
    );
  };

  const onPressDec = (item: any) => {
    if (item.quantity > 1) {
      dispatch(decQun(item));
    }
  };

  const onPressInc = (item: any) => {
    dispatch(incQun(item));
  };

  const onPressRemove = (item: any) => {
    dispatch(removeProduct(item));
  };
  const totalPrice = () => {
    if (productData.length > 0) {
      const price = calculateStoreTotals(productData).totalPrice.toFixed(2);
      const tax: number = (price * 1) / 100;

      return {
        subtotal: price,
        tax: tax.toFixed(2),
        total: (parseFloat(price) + tax + 2).toFixed(2),
      };
    }
  };

  const addToWishList = (item: any) => {
    dispatch(addWishList(item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showLeftIcon={true} title={cartItem.name} />
      <View style={{marginHorizontal: wp(16), flex: 1}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={productData || []}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item, index}: any) => {
            return (
              <CartItemList
                index={index}
                productName={item.name}
                productImage={item.image}
                quantity={item.quantity}
                price={item.price}
                onPressDec={() => onPressDec(item)}
                onPressInc={() => onPressInc(item)}
                onPressRemove={() => onPressRemove(item)}
                onPressSave={() => addToWishList(item)}
              />
            );
          }}
          ListFooterComponent={() => {
            return (
              <>
                <View style={styles.imageStyle}>
                  <Image
                    resizeMode="cover"
                    source={cartItem.image || Icons.cartImage}
                    style={styles.imgStyle}
                  />
                  <View style={{flex: 1, marginLeft: 12}}>
                    <Text style={styles.text1}>{cartItem.name}</Text>
                    <Text style={styles.text2}>{cartItem.distance}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        // alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <Image
                        source={Icons.shopping_bag}
                        style={styles.shopping_bag}
                      />
                      <Text style={styles.text3}>
                        Ready for pickup, {time.time} {time.date}
                      </Text>
                    </View>
                  </View>
                  {/* <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <Text style={styles.viewText}>{'View Location>'}</Text>
                  </TouchableOpacity> */}
                </View>
                <TowTextView
                  title={'Subtotal'}
                  value={'$' + totalPrice()?.subtotal}
                />
                <TowTextView title={'Taxes'} value={'$' + totalPrice()?.tax} />
                <TowTextView title={'Service Fee'} value={'$2.00'} />
                <TowTextView
                  title={'Total'}
                  value={'$' + totalPrice()?.total}
                  style={styles.valueText}
                />
              </>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.buttonContainer}>
          <PrimaryButton
            type="fill"
            title="Checkout"
            onPress={() => {
              if (isLogin) {
                if (Number(totalPrice()?.total) > 25) {
                  navigationRef.navigate(screenName.CardScreen, {
                    cartItem: cartItem,
                  });
                } else {
                  setModalBottom(true);
                }
              } else {
                if (Number(totalPrice()?.total) > 25) {
                  navigationRef.navigate(screenName.LoginScreen, {
                    type: 'cart',
                    cartItem: cartItem,
                  });
                } else {
                  setModalBottom(true);
                }
              }
            }}
            style={{...styles.button, marginBottom: 10}}
          />
          <PrimaryButton
            type="outline"
            title="Continue Shopping"
            onPress={() => {
              navigationRef.navigate(screenName.tabBarName.HomeScreen);
            }}
            style={styles.button}
            titleStyle={styles.titleStyle}
          />
        </View>
        {modalBottom && (
          <BottomModal
            isVisible={modalBottom}
            btnText={'Continue Shopping'}
            onClose={() => {
              setModalBottom(false);
            }}
            onNextPress={() => {
              navigationRef.navigate(screenName.tabBarName.HomeScreen);
            }}
            description={`you are just $${(
              25 - Number(totalPrice()?.subtotal)
            ).toFixed(2)} away from minimum order value`}
            onNextBtnPress={() => {
              setModalBottom(false);
            }}
          />
        )}
        <MapModal isVisible={isVisible} onClose={setIsVisible} />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    paddingVertical: 10,
  },
  buttonContainer: {
    alignSelf: 'center',
    // marginTop: hp(24),
    marginBottom: 20,
  },
  button: {
    width: SCREEN_WIDTH * 0.68,
    paddingVertical: hp(5),
  },
  titleStyle: {
    ...commonFontStyle(700, 18, colors?.black),
  },
  imageStyle: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 16,
    borderTopColor: colors.grey_50,
    borderBottomColor: colors.grey_50,
    marginTop: 20,
    marginBottom: 10,
  },
  imgStyle: {
    height: wp(40),
    width: wp(40),
    resizeMode: 'contain',
    borderRadius: wp(40),
  },
  moreStyle: {
    height: wp(23),
    width: wp(23),
    resizeMode: 'contain',
  },
  shopping_bag: {
    height: wp(12),
    width: wp(12),
    resizeMode: 'contain',
    marginRight: 6,
    marginTop: 2,
  },
  text1: {
    ...commonFontStyle(600, 18, colors.black),
  },
  text2: {
    ...commonFontStyle(600, 14, colors.black),
    marginTop: 3,
  },
  text3: {
    ...commonFontStyle(600, 14, colors.green_04),
    flex: 1,
  },
  titleTextStyle1: {
    ...commonFontStyle(400, 16, colors.black),
    marginTop: hp(4),
    width: wp(120),
  },
  viewText: {
    ...commonFontStyle(600, 14, colors.grey_99),
  },

  towTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  titleText: {
    ...commonFontStyle(600, 18, colors.black),
  },
  valueText: {
    ...commonFontStyle(600, 20, colors.black),
  },
});
