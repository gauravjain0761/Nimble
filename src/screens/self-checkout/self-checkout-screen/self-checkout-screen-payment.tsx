/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
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
import {
  DropdownComponent,
  Header,
  PrimaryButton,
} from '../../../components/common';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../../theme/fonts';
import {navigationRef} from '../../../navigation/mainNavigator';
import {Icons} from '../../../assets';
import {screenName} from '../../../navigation/screenNames';
import {
  AddTip,
  dropDownData2,
  dropDownDataDay,
  storeData,
} from '../../../utils/dummyData';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  addOrderList,
  removeAllProduct,
} from '../../../redux/action/productAction';
import {onPaymentApi, onPaymentSnpApi} from '../../../action/cartAction';

const SelfCheckoutScreenPayment = ({route}: {route: any}) => {
  const {cartItem, amount} = route.params || {};

  const {userData} = useAppSelector(state => state.common);

  const [addTripsSelect, setAddTripsSelect] = useState('');
  const {data}: any = useAppSelector(state => state.product);
  const {time} = useAppSelector(state => state.common);

  const dispatch = useAppDispatch();
  const [productsData, setProductsData] = useState([]);
  const [dropDown1, setDropDown1] = useState('Today');
  const [dropDown2, setDropDown2] = useState('2:00 pm');

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
    if (time) {
      setDropDown1(time.date);
      setDropDown2(time.time);
    }
  }, [time]);

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

  // const calculateStoreTotals = products => {
  //   const result = {totalPrice: 0, totalQuantity: 0};

  //   // Iterate over each product in the object
  //   for (const key in products) {
  //     if (products.hasOwnProperty(key)) {
  //       const product = products[key];
  //       console.log('Products->', product);

  //       const price = parseFloat(product?.price || 0); // Parse price safely
  //       result.totalPrice += price * (product?.count || 0); // Calculate total price
  //       result.totalQuantity += product?.count || 0; // Calculate total quantity
  //     }
  //   }

  //   return result;
  // };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.listView}>
        <Image
          source={item?.matchedProductData?.img}
          style={styles.listImage}
        />
      </View>
    );
  };

  const addRenderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => setAllPrice({...allPrice, tip: item?.title})}
        style={[
          styles.addListView,
          {
            backgroundColor:
              allPrice.tip === item?.title ? colors.green_E4 : colors.white,
          },
        ]}>
        <Text style={styles.addListText}>${item?.title}</Text>
      </TouchableOpacity>
    );
  };

  const onPlaceOrder = () => {
    let UserInfo = {
      data: {
        user: userData,
        cart: [
          {
            _id: '66a9da71de07258f828253f6',
            name: productsData?.matchedProductData?.name,
            description: productsData?.matchedProductData?.description ?? '',
            category: 'Food',
            tags: productsData?.matchedProductData?.tags,
            barcodeContent: productsData?.matchedProductData?.qrCode,
            originalPrice: productsData?.matchedProductData?.price,
            discountPrice: productsData?.matchedProductData?.price,
            stock: 25,
            images: [
              'https://res.cloudinary.com/dcrax16rv/image/upload/v1729616018/products/dvkotkk74igu9vmhhzaj.jpg',
            ],
            reviews: [],
            ratings: 4.5,
            qty: productsData?.count,
            shopId: '6717d7744c2f13a50f94c678',
            shop: {
              _id: '6717d7744c2f13a50f94c678',
              name: 'Vendor',
              email: 'yogendra.rathore12327@gmail.com',
              phoneNumber: 1231231231,
              address: 'NA',
              role: 'Seller',
              avatar: {
                public_id: 'avatars/t2jt6fmls9pkowugkivc',
                url: 'https://res.cloudinary.com/dcrax16rv/image/upload/v1729615513/avatars/t2jt6fmls9pkowugkivc.png',
              },
              zipCode: 123123,
              createdAt: '2024-10-22T16:44:41.840Z',
              __v: 0,
            },
          },
        ],
        shippingAddress: {
          street: 'test address',
        },
        totalPrice: allPrice.total,
        selectedCollectionTime: '2023-11-04T08:46:41.858Z',
        isPremium: false,
      },
      onSuccess: (res: any) => {
        console.log('res', res);
        const storeData = {...cartItem};
        const newData = {
          price: allPrice,
          products: productsData,
          storeData: storeData,
          time: {
            date: dropDown1,
            time: dropDown2,
          },
        };
        dispatch(addOrderList(newData));
        navigationRef.navigate(screenName.LoadingScreenSelfCheckout, {
          headerText: 'Your order is being\nplaced...',

          cartItem: cartItem,
        });
        // dispatch(removeAllProduct(cartItem));
      },
      onFailure: (Err: any) => {
        console.log('Err', Err?.status);

        if (Err?.status == 500) {
          navigationRef.navigate(screenName.LoginScreen, {isFrom: 'checkout'});
        }
      },
    };
    dispatch(onPaymentSnpApi(UserInfo));
    // navigationRef.navigate(screenName.LoadingScreenSelfCheckout, {
    //   headerText: 'Your order is being\nplaced...',
    //   cartItem: cartItem,
    // });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showLeftIcon={true} title={'Checkout'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: wp(16), marginTop: 20, flex: 1}}>
        <Text style={[styles.headerText, {marginTop: 16}]}>{'Payment'}</Text>
        <View style={[styles.viewStyle1]}>
          <Image source={Icons.ic_card} style={styles.card} />
          <Text style={styles.text1}>Credit Card Ending in 0340</Text>
          <Image source={Icons.ic_right} style={styles.shopping_bag} />
        </View>

        <Text style={[styles.headerText, {marginTop: 16}]}>
          {'Review Order'}
        </Text>
        <TouchableOpacity
          style={[styles.viewStyle1, {justifyContent: 'space-between'}]}
          // onPress={() =>
          //   navigationRef.navigate(screenName.ReviewOrder, {cartItem: cartItem})
          // }
        >
          {/* <FlatList
            data={productsData}
            contentContainerStyle={{gap: 3}}
            horizontal
            renderItem={renderItem}
            ListFooterComponent={() => {
              return productsData.length > 3 ? (
                <View
                  style={[styles.listView, {backgroundColor: colors.green_E4}]}>
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginRight: 7}}>
              <Text style={styles.textValue}>${cartItem.amount}</Text>
              {/* <Text style={styles.textValue}>${allPrice.subtotal}</Text> */}
              <Text style={styles.textValueText}>
                {productsData?.count} items in total{' '}
              </Text>
            </View>
            <Image source={Icons.ic_right} style={styles.shopping_bag} />
          </View>
        </TouchableOpacity>

        {/* <Text style={[styles.headerText, {marginTop: 16}]}>{'Add a tip'}</Text>
        <View>
          <FlatList
            data={AddTip}
            contentContainerStyle={{gap: 5, marginTop: 4}}
            horizontal
            renderItem={addRenderItem}
          />
          <Text style={styles.thankText}>
            Say Thank You with a tip for your shopper.
          </Text>
        </View> */}
        <Text style={[styles.headerText, {marginTop: 16}]}>
          {'Order Summary'}
        </Text>
        <View style={styles.orderView}>
          <Text style={styles.orderText}>
            Order No. <Text style={styles.orderTextNo}>#582394</Text>
          </Text>
          <View style={styles.rowStyle}>
            <Text style={styles.rowLeftText}>
              Subtotal{' '}
              <Text style={styles.rowLeftSubText}>
                ({productsData?.count} items)
              </Text>
            </Text>
            <Text style={styles.rowRightText}>${cartItem.amount}</Text>
          </View>
          <View style={styles.orderLineView}>
            <View style={styles.rowStyle}>
              <Text style={styles.rowLeftText}>Taxes (1%)</Text>
              <Text style={styles.rowRightText}>${allPrice.tax}</Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={styles.rowLeftText}>Service Fee</Text>
              <Text style={styles.rowRightText}>$2.00</Text>
            </View>
            {allPrice.tip ? (
              <View style={styles.rowStyle}>
                <Text style={styles.rowLeftText}>Tip</Text>
                <Text style={styles.rowRightText}>${allPrice.tip}</Text>
              </View>
            ) : null}
          </View>
          <View style={[styles.rowStyle, {marginTop: 12}]}>
            <Text style={styles.rowLeftText1}>Final Payment</Text>
            <Text style={styles.rowRightText1}>${allPrice.total}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            type="fill"
            title="Place Order"
            onPress={() => {
              onPlaceOrder();
            }}
            style={{...styles.button, marginBottom: 10}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelfCheckoutScreenPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: hp(24),
  },
  button: {
    width: SCREEN_WIDTH * 0.68,
    paddingVertical: hp(5),
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
  headerText: {
    ...commonFontStyle(700, 18, colors.black),
    marginBottom: 5,
  },
  pickupViewStyle: {
    marginTop: 5,
    backgroundColor: colors.green_E4,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopping_bag: {
    height: wp(12),
    width: wp(12),
    resizeMode: 'contain',
    marginRight: 6,
  },
  text3: {
    ...commonFontStyle(600, 16, colors.green_04),
    flex: 1,
  },

  viewStyle1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.grey_20,
  },
  card: {
    height: wp(20),
    width: wp(20),
    resizeMode: 'contain',
    marginRight: 10,
  },
  text1: {
    ...commonFontStyle(600, 16, colors.grey_80),
    flex: 1,
  },

  listView: {
    backgroundColor: colors.grey_F5,
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listImage: {
    width: 30,
    height: 30,
  },

  textValue: {
    ...commonFontStyle(600, 14, colors.grey_80),
    textAlign: 'right',
  },
  textValueText: {
    ...commonFontStyle(400, 14, colors.grey_80),
  },
  valueStyle: {
    ...commonFontStyle(600, 16, colors.secondaryPrimary),
  },

  addListView: {
    borderRadius: 16,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.grey_20,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addListText: {
    ...commonFontStyle(600, 14, colors.grey_4A),
  },

  thankText: {
    ...commonFontStyle(400, 12, colors.grey_4A),
    marginTop: 10,
  },

  orderView: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.grey_20,
    padding: 20,
    marginTop: 10,
  },
  orderText: {
    ...commonFontStyle(400, 14, colors.grey_4A),
  },
  orderTextNo: {
    ...commonFontStyle(400, 14, colors.grey_96),
  },

  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  orderLineView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginTop: 14,
    borderTopColor: colors.grey_4A,
    borderBottomColor: colors.grey_4A,
    paddingBottom: 14,
  },
  rowLeftText: {
    ...commonFontStyle(700, 14, colors.grey_4A),
  },
  rowLeftSubText: {
    ...commonFontStyle(500, 14, colors.grey_4A),
  },
  rowRightText: {
    ...commonFontStyle(500, 14, colors.grey_4A),
  },

  rowLeftText1: {
    ...commonFontStyle(600, 20, colors.grey_0B),
  },
  rowRightText1: {
    ...commonFontStyle(600, 20, colors.grey_0B),
  },
});
