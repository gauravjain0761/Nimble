/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../theme/colors';
import {Header, PrimaryButton} from '../../../components/common';
import {commonFontStyle, hp, wp} from '../../../theme/fonts';
import {Icons} from '../../../assets';
import OrderStatusTimeline from '../../../components/orders/OrderStatusTimeline';
import {navigationRef} from '../../../navigation/mainNavigator';
import {screenName} from '../../../navigation/screenNames';

import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {showAlert} from '../../../utils/commonFunction';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ASS_STATUS_ORDER_LIST_DATA} from '../../../redux/actionTypes';
import MapModal from '../../orders/map-modal/map-modal';

const ReceiptScreen = ({navigation, route}: any) => {
  const {type, orderData, cartItem} = route.params || {};
  console.log('route.params->', route);

  const {orderListData}: any = useAppSelector(state => state.product);
  const {time} = useAppSelector(state => state.common);

  const {goBack} = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const [orderStatus, setOrderStatus] = useState('Confirmed');
  const [outOfStock, setOutOfStock] = useState(false);
  const [cancelOrder, setCancelOrder] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const [productsData, setProductsData] = useState([]);
  console.log('CartItems', cartItem);

  const [allPrice, setAllPrice] = useState({
    subtotal: 0,
    tax: '',
    tip: '',
    total: '',
  });

  useEffect(() => {
    if (cartItem) {
      setProductsData(cartItem);
    }
  }, [cartItem]);

  useEffect(() => {
    if (productsData) {
      // const newPrice = calculateStoreTotals(productsData).totalPrice.toFixed(2);
      const newPrice = productsData?.matchedProductData?.price;
      console.log('New Price', newPrice);
      const subTotal = newPrice * productsData?.count;
      const tax = (subTotal * 1) / 100; // Calculate tax (1%)
      const tip = Number(allPrice.tip);
      const total = (Number(subTotal) + tax + 2 + tip).toFixed(2); // Calculate total
      setAllPrice({
        subtotal: subTotal,
        tax: tax.toFixed(2),
        tip: allPrice.tip,
        total: total,
      });
    }
  }, [productsData, allPrice.tip]);

  // useEffect(() => {
  //   if (type === 'order' && orderData?.storeData?.id) {
  //     const newData = orderListData?.find(
  //       item => item?.storeData?.id === orderData?.storeData?.id,
  //     );
  //     if (newData) {
  //       setAllPrice(newData.price);
  //       setProductsData(newData?.products || []);
  //     }
  //   } else if (type !== 'order' && cartItem?.id) {
  //     const newData = orderListData?.find(
  //       item => item?.storeData?.id === cartItem?.id,
  //     );
  //     if (newData) {
  //       setAllPrice(newData.price);
  //       setProductsData(newData?.products || []);
  //     }
  //   }
  // }, [cartItem, type, orderData, isFocused, orderListData]);

  // useEffect(() => {
  //   if (type !== 'order') {
  //     if (productsData.length > 0) {
  //       const newPrice =
  //         calculateStoreTotals(productsData).totalPrice.toFixed(2);
  //       const tax: number = (newPrice * 1) / 100;
  //       const tip = Number(allPrice.tip);
  //       const total = (Number(newPrice) + tax + 2 + tip).toFixed(2);
  //       setAllPrice({
  //         subtotal: newPrice,
  //         tax: tax.toFixed(2),
  //         tip: allPrice.tip,
  //         total: total,
  //       });
  //     }
  //   }
  // }, [productsData, allPrice.tip, type]);

  // const calculateStoreTotals = (products: any) => {
  //   return products.reduce(
  //     (acc: any, product: any) => {
  //       const price = Number(product.price);
  //       acc.totalPrice += price * product.quantity; // Calculate total price
  //       acc.totalQuantity += product.quantity; // Calculate total quantity
  //       return acc;
  //     },
  //     {totalPrice: 0, totalQuantity: 0},
  //   );
  // };

  const renderItem = ({item}) => {
    return (
      <View style={styles.listView}>
        <Image source={item?.image} style={styles.listImage} />
      </View>
    );
  };

  useEffect(() => {
    if (orderData?.status) {
      setOrderStatus(orderData.status);
      setCancelOrder(orderData.status === 'Cancelled' ? true : false);
    }
  }, [orderData]);

  useEffect(() => {
    dispatch({
      type: ASS_STATUS_ORDER_LIST_DATA,
      payload: {
        status: orderStatus,
        storeId: orderData?.storeData?.id || cartItem?.id,
      },
    });
  }, [orderData, cartItem, orderStatus]);

  const products = [
    {
      quantity: 1,
      name: 'Gala Apple Bag 2 lbs',
      price: 3.99,
    },
    {
      quantity: 2,
      name: 'Bananas',
      price: 1.5,
    },
    {
      quantity: 3,
      name: 'Oranges',
      price: 2.75,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={'Order'}
        showRightIcon
        rightIcon={Icons.ic_close}
        onBackPressScreen={() =>
          navigation.navigate(screenName.OrderConfirmation)
        }
      />

      <View></View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: wp(16)}}>
        <Text style={[styles.headerText, {marginTop: 7}]}>
          {'Order Details'}
        </Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Number</Text>
            <Text style={styles.detailValue}>#582394</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Time</Text>
            <Text style={styles.detailValue1}>
              {time.time} {time.date}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Status</Text>
            <Text style={[styles.detailValue, styles.placedStatus]}>
              {orderStatus}
            </Text>
          </View>
          <View style={[styles.detailRow, {marginBottom: 2}]}>
            {/* <FlatList
              data={productsData}
              contentContainerStyle={{gap: 3}}
              horizontal
              renderItem={renderItem}
              ListFooterComponent={() => {
                return productsData.length > 3 ? (
                  <View
                    style={[
                      styles.listView,
                      {backgroundColor: colors.green_E4},
                    ]}>
                    <Text style={styles.valueStyle}>
                      +{productsData.length - 3}
                    </Text>
                  </View>
                ) : null;
              }}
            /> */}
            <View style={styles.listView}>
              <Image
                source={productsData?.matchedProductData?.image}
                style={styles.listImage}
              />
            </View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.viewStyle}>View</Text>
              <Image source={Icons.rightArrow} style={styles.rightArrow} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.headerText, {marginTop: 0}]}>
          {'Order Summary'}
        </Text>
        <View style={styles.detailsContainer}>
          <View>
            <View
              style={styles.detailRow}
              key={productsData?.matchedProductData?.id}>
              <View style={{gap: 10, flexDirection: 'row'}}>
                <View style={styles.itemQuantity}>
                  <Text style={styles.detailLabel}>{productsData?.count} </Text>
                </View>
                <Text style={styles.detailLabel}>
                  {productsData?.matchedProductData?.name}{' '}
                </Text>
              </View>
              <Text style={styles.detailValue}>
                ${productsData?.matchedProductData?.price}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.detailRow,
              {
                borderTopWidth: 1,
                borderTopColor: colors.grey_4A,
                marginTop: 2,
                marginBottom: 5,
              },
            ]}></View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Subtotal{' '}
              <Text style={styles.rowLeftSubText}>
                ({productsData?.count} items)
              </Text>
            </Text>
            <Text style={styles.detailValue}>${allPrice.subtotal}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Taxes (1%)</Text>
            <Text style={styles.detailValue}>${allPrice.tax}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Service Fee</Text>
            <Text style={styles.detailValue}>$2.00</Text>
          </View>
          {allPrice.tip && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tip</Text>
              <Text style={styles.detailValue1}>${allPrice.tip || 0}</Text>
            </View>
          )}
          <View
            style={[
              styles.detailRow,
              {
                borderTopWidth: 1,
                borderTopColor: colors.grey_4A,
                marginTop: 2,
                marginBottom: 0,
              },
            ]}>
            <Text style={[styles.detailLabel1, {marginTop: 12}]}>Total</Text>
            <Text style={[styles.detailValue2, {marginTop: 12}]}>
              ${Number(allPrice.total).toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {/* <PrimaryButton
              type="outline"
              title="Continue "
              onPress={() => {
                onContinueOrderPress();
              }}
              style={styles.button}
            /> */}

          <>
            <PrimaryButton
              type="outline"
              title="Show QR Code"
              onPress={() => {
                navigation.navigate(screenName.OrderConfirmation);
              }}
              style={styles.button}
            />
          </>
        </View>
        <MapModal isVisible={isVisible} onClose={setIsVisible} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReceiptScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  headerText: {
    ...commonFontStyle(700, 18, colors.black),
    marginBottom: 12,
  },

  buttonContainer: {
    alignSelf: 'center',
    gap: hp(16),
    marginBottom: hp(38),
  },
  button: {
    paddingHorizontal: wp(60),
    height: hp(48),
  },

  statusMessage: {
    backgroundColor: '#E7F4E4',
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
    paddingLeft: 20,
  },
  statusText: {
    ...commonFontStyle(800, 16, colors.green_25),
  },
  statusText1: {
    ...commonFontStyle(600, 16, colors.green_25),
  },
  confirmed1: {
    ...commonFontStyle(800, 16, colors.green_25),
  },
  confirmed2: {
    ...commonFontStyle(600, 16, colors.green_25),
  },

  detailsContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.grey_20,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    ...commonFontStyle(700, 14, colors.grey_4A),
  },
  rowLeftSubText: {
    ...commonFontStyle(500, 14, colors.grey_4A),
  },
  detailValue: {
    ...commonFontStyle(500, 14, colors.grey_4A),
  },
  detailValue1: {
    ...commonFontStyle(500, 14, colors.grey_2C),
  },
  placedStatus: {
    ...commonFontStyle(600, 14, colors.green_04),
  },
  detailLabel1: {
    ...commonFontStyle(700, 17, colors.grey_0B),
  },
  detailValue2: {
    ...commonFontStyle(600, 17, colors.grey_0B),
  },

  listView: {
    backgroundColor: colors.grey_F5,
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueStyle: {
    ...commonFontStyle(600, 16, colors.secondaryPrimary),
  },
  listImage: {
    width: 30,
    height: 30,
  },
  rightArrow: {
    width: 12,
    height: 12,
  },
  viewStyle: {
    ...commonFontStyle(600, 14, colors.grey_50),
    bottom: 1,
  },

  orderStatus: {
    backgroundColor: '#FEF9C3B2',
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
    paddingLeft: 20,
  },
  orderStatus1: {
    ...commonFontStyle(800, 16, colors.grey_8D),
  },
  orderStatus2: {
    ...commonFontStyle(600, 16, colors.grey_8D),
  },
  orderStatusView: {
    backgroundColor: colors.white_F2,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
    paddingLeft: 20,
  },
  orderStatus3: {
    ...commonFontStyle(600, 16, colors.grey_8D),
  },

  readyView: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
    paddingLeft: 20,
  },
  readyViewText: {
    ...commonFontStyle(800, 16, colors.grey_8D),
  },
  readyViewText1: {
    ...commonFontStyle(600, 16, colors.grey_8D),
  },
  itemQuantity: {
    backgroundColor: colors.green_E4,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
