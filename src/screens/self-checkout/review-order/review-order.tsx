import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {colors} from '../../../theme/colors';
import {Header, PrimaryButton} from '../../../components/common';
import {commonFontStyle, hp, wp} from '../../../theme/fonts';
import {BottomModal, CartItemList} from '../../../components';
import {navigationRef} from '../../../navigation/mainNavigator';
import {screenName} from '../../../navigation/screenNames';
import {Icons} from '../../../assets';
import {useRoute} from '@react-navigation/native';
import ConfirmUpdateModal from '../../../components/modal/ConfirmUpdateModal';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  DECREASE_ORDER_LIST,
  INCREASE_ORDER_LIST,
  REMOVE_ORDER_LIST,
} from '../../../redux/actionTypes';

const ReviewOrder: FC = ({navigation}: any) => {
  const {params}: any = useRoute();
  const {type, newItemAdded, cartItem, orderData} = params || {};

  const dispatch = useAppDispatch();
  const {orderListData} = useAppSelector(state => state.product);

  const [outOfStock, setOutOfStock] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [modalBottom, setModalBottom] = useState(false);

  const [newItemAdd, setNewItemAdd] = useState(false);

  const [orderList, setOrderList] = useState<any>([]);

  useEffect(() => {
    if (type === 'update') {
      setOutOfStock(true);
      setNewItemAdd(newItemAdded ?? false);
    }
  }, [type, outOfStock, newItemAdded]);

  useEffect(() => {
    if (type === 'modify') {
      let newData = null;
      if (orderData) {
        [newData] = orderListData?.filter((item: any) => {
          return item?.storeData?.id === orderData?.storeData?.id;
        });
      } else {
        [newData] = orderListData?.filter((item: any) => {
          return item?.storeData?.id === cartItem?.id;
        });
      }

      if (newData) {
        setOrderList(newData);
      }
    }
  }, [type, cartItem, orderData, orderListData]);

  const onPressInc = (item: any) => {
    dispatch({
      type: INCREASE_ORDER_LIST,
      payload: {
        productId: item.id,
        storeId: orderData?.storeData?.id || cartItem?.id,
      },
    });
  };
  const onPressDec = (item: any) => {
    dispatch({
      type: DECREASE_ORDER_LIST,
      payload: {
        productId: item.id,
        storeId: orderData?.storeData?.id || cartItem?.id,
      },
    });
  };
  const onPressRemove = (item: any) => {
    dispatch({
      type: REMOVE_ORDER_LIST,
      payload: {
        productId: item.id,
        storeId: orderData?.storeData?.id || cartItem?.id,
      },
    });
  };

  //   console.log('====================================');
  //   console.log(cartItem);
  //   console.log('====================================');

  const TowTextView = ({title, value, style}: any) => {
    return (
      <View style={styles.towTextView}>
        <Text style={[styles.titleText, style]}>{title}</Text>
        <Text style={[styles.valueText, style]}>{value}</Text>
      </View>
    );
  };

  const totalPrice = () => {
    if (cartItem.length > 0) {
      const price = calculateStoreTotals(cartItem).totalPrice.toFixed(2);
      const tax: number = (price * 1) / 100;

      return {
        subtotal: price,
        tax: tax.toFixed(2),
        total: (parseFloat(price) + tax + 2).toFixed(2),
      };
    }
  };
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

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.renderItemContainer}>
        <CartItemList
          index={index}
          showSaveForLater={true}
          productName={item.name}
          productImage={item.image}
          quantity={item.quantity}
          price={item.price}
          onPressDec={() => onPressDec(item)}
          onPressInc={() => onPressInc(item)}
          onPressRemove={() => onPressRemove(item)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Review Order'} showLeftIcon={true} />

      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        {outOfStock ? (
          <>
            <Text style={[styles.headerText]}>
              {newItemAdd ? 'New Added Item' : 'Missing Item'}
            </Text>
            <View style={styles.contentContainerStyle}>
              <View style={styles.renderItemContainer}>
                <CartItemList
                  index={0}
                  showSaveForLater={false}
                  outOfStock={newItemAdd === true ? !newItemAdd : outOfStock}
                />
              </View>
            </View>
          </>
        ) : null}

        <Text style={[styles.headerText]}>{'Current Order'}</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={cartItem || []}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.contentContainerStyle}>
          <TowTextView title={'Taxes'} value={'$' + totalPrice()?.tax} />
          <TowTextView title={'Fee'} value={'$2.00'} />
          <TowTextView
            title={'Total'}
            value={'$' + totalPrice()?.total}
            style={styles.valueText}
          />
        </View>
      </ScrollView>
      {/* <Text style={[styles.totalText]}>
        {'Current Total: $' +
          (orderList?.price?.total
            ? Number(orderList?.price?.subtotal).toFixed(2)
            : 0)}
      </Text> */}

      <View style={styles.buttonContainer}>
        <PrimaryButton
          type="fill"
          title={'Looks Good'}
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.button}
        />

        <PrimaryButton
          type={newItemAdd === true ? 'fill' : 'outline'}
          title="Add More Items"
          //   disabled={type === 'update' && newItemAdd === true ? false : true}
          onPress={() => {
            null;
          }}
          style={styles.button}
        />
        {newItemAdd === true && (
          <PrimaryButton
            type={'outline'}
            title="Add More Item"
            onPress={() => {
              navigation.navigate(screenName.StoreScreen, {
                item: cartItem || orderData,
                type: 'modify',
              });
            }}
            style={styles.button}
          />
        )}
        {modalBottom && (
          <BottomModal
            isVisible={modalBottom}
            btnText={'Continue Shopping'}
            onClose={() => {
              setModalBottom(false);
            }}
            onNextPress={() => {
              setModalBottom(false);
            }}
            description={`you are just $${(
              25 - Number(orderList?.price?.subtotal)
            ).toFixed(2)} away from minimum order value`}
            onNextBtnPress={() => {
              setModalBottom(false);
            }}
          />
        )}
        <ConfirmUpdateModal
          isVisible={isVisible}
          message={'Your new total is $' + orderList?.price?.subtotal}
          onConfirm={() => {
            setIsVisible(false);
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReviewOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerText: {
    ...commonFontStyle(700, 18, colors.black),
    margin: 15,
    marginTop: 25,
  },
  renderItemContainer: {
    borderBottomWidth: 1,
    paddingTop: 10,
  },
  contentContainerStyle: {
    padding: 15,
  },
  totalText: {
    ...commonFontStyle(700, 18, colors.black),
    margin: 15,
    marginTop: 25,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: wp(90),
  },

  buttonContainer: {
    alignSelf: 'center',
    gap: hp(10),
    marginBottom: hp(30),
  },
  missingItemContainer: {
    marginTop: 10,
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
