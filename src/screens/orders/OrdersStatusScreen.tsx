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
import {colors} from '../../theme/colors';
import {Header, PrimaryButton} from '../../components/common';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {Icons} from '../../assets';
import OrderStatusTimeline from '../../components/orders/OrderStatusTimeline';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';
import MapModal from './map-modal/map-modal';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {showAlert} from '../../utils/commonFunction';
import {useIsFocused} from '@react-navigation/native';
import {ASS_STATUS_ORDER_LIST_DATA} from '../../redux/actionTypes';

const OrdersStatusScreen = ({navigation, route}: any) => {
  const {type, orderData, cartItem} = route.params || {};
  const {orderListData}: any = useAppSelector(state => state.product);
  const {time} = useAppSelector(state => state.common);
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const [orderStatus, setOrderStatus] = useState('Placed');
  const [outOfStock, setOutOfStock] = useState(false);
  const [cancelOrder, setCancelOrder] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const [productsData, setProductsData] = useState([]);

  const [allPrice, setAllPrice] = useState({
    subtotal: 0,
    tax: '',
    tip: '',
    total: '',
  });

  useEffect(() => {
    if (type === 'order') {
      const [newData] = orderListData?.filter((item: any) => {
        return item?.storeData?.id === orderData?.storeData?.id;
      });
      setAllPrice(newData.price);
      setProductsData(newData.products);
    } else {
      if (cartItem.products.length > 0) {
        const [newData] = orderListData?.filter((item: any) => {
          return item?.storeData?.id === cartItem?.id;
        });
        setAllPrice(newData.price);
        setProductsData(newData?.products);
      }
    }
  }, [cartItem, type, orderData, isFocused, orderListData]);

  useEffect(() => {
    if (type !== 'order') {
      if (productsData.length > 0) {
        const newPrice =
          calculateStoreTotals(productsData).totalPrice.toFixed(2);
        const tax: number = (newPrice * 1) / 100;
        const tip = Number(allPrice.tip);
        const total = (Number(newPrice) + tax + 2 + tip).toFixed(2);
        setAllPrice({
          subtotal: newPrice,
          tax: tax.toFixed(2),
          tip: allPrice.tip,
          total: total,
        });
      }
    }
  }, [productsData, allPrice.tip, type]);

  const calculateStoreTotals = (products: any) => {
    return products.reduce(
      (acc: any, product: any) => {
        const price = Number(product.price);
        acc.totalPrice += price * product.quantity; // Calculate total price
        acc.totalQuantity += product.quantity; // Calculate total quantity
        return acc;
      },
      {totalPrice: 0, totalQuantity: 0},
    );
  };

  const onContinueOrderPress = () => {
    if (orderStatus === 'Placed') {
      setOrderStatus('Confirmed');
    } else if (orderStatus === 'Confirmed') {
      setOrderStatus('Preparing');
      setOutOfStock(false);
    } else if (orderStatus === 'Preparing') {
      setOrderStatus('Ready');
    } else if (orderStatus === 'Ready') {
      setOrderStatus('Collected');
    } else if (orderStatus === 'Collected') {
      // setOrderStatus('Preparing');
      navigationRef.navigate(screenName.tabBarName.Orders);
    } else {
      navigationRef.navigate(screenName.tabBarName.HomeScreen);
    }
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={'Order'}
        showRightIcon
        rightIcon={Icons.ic_close}
        onBackPressScreen={() => {
          navigationRef.navigate(screenName.tabBarName.Orders);
          // if (type === 'order') {
          //   navigation.goBack();
          // } else {
          //   navigation.pop(2);
          // }
        }}
      />

      <View>
        <OrderStatusTimeline
          name={orderStatus}
          outOfStock={outOfStock}
          cancelOrder={cancelOrder}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: wp(16)}}>
        {orderStatus == 'Placed' && (
          <View style={styles.statusMessage}>
            <Text style={styles.statusText}>Your order has been placed!</Text>
          </View>
        )}
        {orderStatus === 'Cancelled' && (
          <View style={styles.orderStatusView}>
            <Text style={styles.orderStatus3}>
              Your order has been cancelled successfully. The refund will be
              processed within 3-5 business days.
            </Text>
          </View>
        )}
        {orderStatus == 'Confirmed' && (
          <>
            {outOfStock ? (
              <View style={styles.orderStatus}>
                <Text style={styles.orderStatus1}>
                  Action Needed.{' '}
                  <Text style={styles.orderStatus2}>
                    Some items are out of stock in your order. Please review and
                    confirm before we prepare it.
                  </Text>
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setOutOfStock(true);
                }}
                style={styles.statusMessage}>
                <Text style={styles.confirmed1}>
                  Your order is confirmed.{' '}
                  <Text style={styles.confirmed2}>
                    Just sit back and we will notify you when it’s ready!
                  </Text>
                </Text>
              </TouchableOpacity>
            )}
            {outOfStock && (
              <PrimaryButton
                type="fill"
                title="Update Order"
                onPress={() => {
                  navigationRef.navigate(screenName.UpdateOrder, {
                    type: 'update',
                  });
                }}
                style={[styles.button, {marginBottom: 12}]}
              />
            )}
          </>
        )}

        {orderStatus == 'Preparing' && (
          <>
            <View style={styles.statusMessage}>
              <Text style={styles.statusText}>
                Your order is ready!{' '}
                <Text style={styles.statusText1}>
                  Head to Fulton Market for your pick up.
                </Text>
              </Text>
            </View>

            <PrimaryButton
              type="fill"
              title="Pick up Order"
              onPress={() => {
                navigationRef.navigate(screenName.OrderConfirmation);
              }}
              style={[styles.button, {marginBottom: 10}]}
            />
            <PrimaryButton
              type="outline"
              title="View Location"
              onPress={() => {
                setIsVisible(true);
              }}
              style={[styles.button, {paddingVertical: hp(3)}]}
            />
          </>
        )}
        {orderStatus == 'Ready' && (
          <>
            <View style={styles.readyView}>
              <Text style={styles.readyViewText}>
                The order was never picked up.{' '}
                <Text style={styles.readyViewText1}>
                  Your pick up has been cancelled by the store.
                </Text>
              </Text>
            </View>

            <PrimaryButton
              type="fill"
              title="Order Again"
              onPress={() => {}}
              style={[styles.button, {marginBottom: 10}]}
            />
          </>
        )}
        {orderStatus === 'Collected' && (
          <>
            <View style={styles.readyView}>
              <Text style={styles.readyViewText}>
                Your order has been cancelled.{' '}
                <Text style={styles.readyViewText1}>
                  The store is unable to fulfill your order at the moment.
                </Text>
              </Text>
            </View>

            <PrimaryButton
              type="fill"
              title="Shop at Other Stores"
              onPress={() => {
                navigationRef.navigate(screenName.tabBarName.HomeScreen);
              }}
              style={[
                styles.button,
                {marginBottom: 10, paddingHorizontal: wp(0)},
              ]}
            />
          </>
        )}

        <Text style={[styles.headerText, {marginTop: 7}]}>
          {'Order Details'}
        </Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Number</Text>
            <Text style={styles.detailValue}>#582394</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Collection Time</Text>
            <Text style={styles.detailValue1}>
              {time.time} {time.date} (9/10)
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Status</Text>
            <Text style={[styles.detailValue, styles.placedStatus]}>
              {orderStatus}
            </Text>
          </View>
          <View style={[styles.detailRow, {marginBottom: 2}]}>
            <FlatList
              data={productsData.slice(0, 3)}
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
            />
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
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Subtotal{' '}
              <Text style={styles.rowLeftSubText}>
                ({productsData.length} items)
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
          {orderStatus === 'Placed' && (
            <>
              <PrimaryButton
                type="fill"
                title="Modify Order"
                onPress={() => {
                  showAlert(
                    'Modify Order',
                    'Are you sure you want to modify your order?',
                    () => {
                      navigationRef.navigate(screenName.UpdateOrder, {
                        type: 'modify',
                        orderData: orderData,
                        cartItem: cartItem,
                      });
                    },
                  );
                }}
                style={styles.button}
              />
              <PrimaryButton
                type="outline"
                title="Cancel Order"
                onPress={() => {
                  showAlert(
                    'Cancel Order',
                    'Are you sure you want to cancel your order?',
                    () => {
                      dispatch({
                        type: ASS_STATUS_ORDER_LIST_DATA,
                        payload: {
                          status: 'Cancelled',
                          storeId: orderData?.storeData?.id || cartItem?.id,
                        },
                      });
                      setCancelOrder(true);
                      setOrderStatus('Cancelled');
                    },
                  );
                }}
                style={styles.button}
              />
            </>
          )}
        </View>
        <MapModal isVisible={isVisible} onClose={setIsVisible} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersStatusScreen;

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
    paddingHorizontal: wp(110),
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
});
