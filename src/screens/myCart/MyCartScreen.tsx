/* eslint-disable react-native/no-inline-styles */
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../theme/colors';
import {Header, PrimaryButton} from '../../components/common';
import {BottomModal, CartItem} from '../../components';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {storeData} from '../../utils/dummyData';
import {removeAllProduct} from '../../redux/action/productAction';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';

const MyCartScreen = () => {
  const {data} = useAppSelector(state => state.product);
  const {isLogin, time} = useAppSelector(state => state.common);

  const dispatch = useAppDispatch();
  const [myCartData, setMyCartData] = useState([]);
  const [modalBottom, setModalBottom] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      const newCartData = associateProductsWithStores(storeData, data);
      setMyCartData(newCartData);
    } else {
      setMyCartData([]);
    }
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

  // Function to calculate totals for each store
  const calculateStoreTotals = (products: any) => {
    if (products) {
      return products.reduce(
        (acc: any, product: any) => {
          const price = parseFloat(product.price);
          acc.totalPrice += price * product.quantity; // Calculate total price
          acc.totalQuantity += product.quantity; // Calculate total quantity
          return acc;
        },
        {totalPrice: 0, totalQuantity: 0},
      );
    } else {
      return {totalPrice: 0, totalQuantity: 0};
    }
  };
  const onRemove = (item: any) => {
    dispatch(removeAllProduct(item));
  };

  // Function to calculate the total price
  const calculateTotalPrice = (item: any) => {
    let totalPrice = 0;

    item.forEach((store: any) => {
      store.products.forEach((product: any) => {
        const price = parseFloat(product.price); // Convert price to a float number
        const quantity = product.quantity;
        totalPrice += price * quantity;
      });
    });

    return totalPrice.toFixed(2); // Return total price formatted to 2 decimal places
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'My Carts'} />
      <View style={{marginHorizontal: wp(16), flex: 1}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 10, flexGrow: 1}}
          data={myCartData}
          renderItem={({item, index}: any) => {
            return (
              <CartItem
                index={index}
                storeImage={item.image}
                storeName={item.name}
                item={item}
                time={time.time}
                date={time.date}
                total={calculateStoreTotals(item?.products)?.totalPrice.toFixed(
                  2,
                )}
                onRemove={() => onRemove(item)}
                onPressStore={() => {
                  navigationRef.navigate(screenName.StoreScreen, {
                    item: item,
                  });
                }}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.emptyText}>No Items in Cart</Text>
            </View>
          }
        />
        {/* {myCartData.length > 0 && (
          <View style={styles.buttonContainer}>
            <PrimaryButton
              type="fill"
              title="Checkout"
              onPress={() => {
                if (isLogin) {
                  if (Number(calculateTotalPrice(myCartData)) > 25) {
                    navigationRef.navigate(screenName.CardScreen);
                  } else {
                    setModalBottom(true);
                  }
                } else {
                  if (Number(calculateTotalPrice(myCartData)) > 25) {
                    navigationRef.navigate(screenName.LoginScreen, {
                      type: 'cart',
                    });
                  } else {
                    setModalBottom(true);
                  }
                  // navigationRef.navigate(screenName.CreateSingScreen);
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
        )} */}

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
              25 - Number(calculateTotalPrice(myCartData))
            ).toFixed(2)} away from minimum order value`}
            onNextBtnPress={() => {
              setModalBottom(false);
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  emptyText: {
    ...commonFontStyle(400, 20, colors.secondaryPrimary),
  },
  buttonContainer: {
    alignSelf: 'center',
    // marginTop: hp(24),
    marginVertical: 20,
  },
  button: {
    width: SCREEN_WIDTH * 0.68,
    paddingVertical: hp(5),
  },
  titleStyle: {
    ...commonFontStyle(700, 18, colors?.black),
  },
});
