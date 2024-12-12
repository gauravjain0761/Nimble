import {
  FlatList,
  Image,
  Platform,
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
import {
  BottomModal,
  CarouselBanner,
  CartItem,
  TrendingItem,
} from '../../components';
import {commonFontStyle, hp, SCREEN_HEIGHT, wp} from '../../theme/fonts';
import {carouselBanner, products, storeProduct} from '../../utils/dummyData';
import {Icons} from '../../assets';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  addProduct,
  addWishList,
  decQun,
  incQun,
} from '../../redux/action/productAction';
import {successToast} from '../../utils/commonFunction';

const ProductDetails = ({navigation}) => {
  const {params}: any = useRoute();
  const {wishListData, data} = useAppSelector(state => state.product);
  const {productItem}: any = params || {};
  const {type}: any = params?.item || {};

  const dispatch = useAppDispatch();
  const [modalBottom, setModalBottom] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const newData = [
    {
      id: 1,
      image: productItem.image,
    },
    {
      id: 1,
      image: productItem.image,
    },
  ];
  const addToWishList = (item: any) => {
    dispatch(addWishList(item || productItem));
  };
  const addToCart = (item: any) => {
    const newData = {
      ...item,
      quantity: quantity,
    };
    dispatch(addProduct(newData));
  };
  const onPressDec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onPressInc = () => {
    setQuantity(quantity + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CarouselBanner data={newData} showImage={false} />
      <TouchableOpacity
        style={styles.backView}
        onPress={() => {
          navigationRef.goBack();
        }}>
        <Image
          source={Icons.backArrow}
          resizeMode="contain"
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <ScrollView style={{flex: 1, marginHorizontal: wp(16)}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 20,
          }}>
          <View style={{flex: 1}}>
            <Text numberOfLines={3} style={styles.text1}>
              {productItem.name}
            </Text>
            <Text style={styles.text2}>
              ${productItem.price} <Text style={styles.text3}>per item</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              addToWishList();
            }}>
            <Image
              source={
                wishListData.some((p: any) => p.name === productItem.name)
                  ? Icons.heartFill
                  : Icons.heart
              }
              resizeMode="contain"
              tintColor={colors.red}
              style={styles.saveStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.addBtnView}>
          <TouchableOpacity onPress={() => onPressDec()}>
            <Image
              resizeMode="cover"
              source={Icons.ic_minus}
              style={styles.moreStyle}
            />
          </TouchableOpacity>
          <Text style={styles.valueText}>{quantity}</Text>
          <TouchableOpacity onPress={() => onPressInc()}>
            <Image
              resizeMode="cover"
              source={Icons.ic_plus}
              style={styles.moreStyle}
            />
          </TouchableOpacity>
        </View>
        {/* <View>
          <Text style={styles.stockText}>
            {
              'If this item is out of stock, choose what you would like the staff to do:'
            }
          </Text>
          <View style={styles.radioView}>
            <View style={styles.radioMain}>
              <View style={styles.radioStyle} />
            </View>
            <Text style={styles.radioText}>
              {'Refund me if item is unavailable'}
            </Text>
          </View>
        </View> */}
        <View style={styles.order}>
          <Text style={styles.title}>{'Related Products'}</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={products[0].productImages}
            renderItem={({item, index}) => {
              return (
                <TrendingItem
                  containerStyle={styles.itemcontainer}
                  index={index}
                  description={item?.name}
                  images={item?.image}
                  amount={item?.price}
                  onPressAdd={() => {
                    addToCart(item);
                    successToast('Product added to cart');
                  }}
                  onPressHeart={() => {
                    addToWishList(item);
                  }}
                  isWishlist={wishListData.some(
                    (i: any) => i.name === item.name,
                  )}
                  onPress={() =>
                    navigationRef.navigate(screenName.ProductDetails, {
                      item: params?.item,
                      productItem: item,
                    })
                  }
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          type="fill"
          title={
            type === 'modify'
              ? 'Add to Existing Order'
              : type === 'update'
              ? 'Add as Replacement'
              : 'Add to Cart'
          }
          onPress={() => {
            successToast('Product added to cart');
            if (type === 'modify' || type === 'update') {
              setModalBottom(true);
            } else {
              addToCart(productItem);
            }
          }}
          style={styles.button}
        />
      </View>
      {modalBottom && (
        <BottomModal
          isVisible={modalBottom}
          text1={'Item has been added!'}
          btnText={'View Cart (2)'}
          onClose={() => {
            setModalBottom(false);

            if (type === 'modify' || type === 'update') {
              navigationRef.navigate(screenName.UpdateOrder, {
                type: type,
                newItemAdded: type === 'update' ? true : false,
              });
            }
          }}
          onNextBtnPress={() => {
            addToCart(productItem);
          }}
          onNextPress={() => {
            navigationRef.navigate(screenName.tabBarName.MyCartScreen);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backView: {
    position: 'absolute',
    top:
      Platform.OS == 'android' ? SCREEN_HEIGHT * 0.03 : SCREEN_HEIGHT * 0.083,
    left: 16,
  },
  iconStyle: {
    width: wp(36),
    height: hp(36),
  },
  saveStyle: {
    width: wp(24),
    height: hp(24),
    marginTop: 5,
  },
  text1: {
    ...commonFontStyle(700, 20, colors.black),
    paddingRight: wp(10),
  },
  text2: {
    ...commonFontStyle(600, 20, colors.black),
    marginTop: 6.5,
  },
  text3: {
    ...commonFontStyle(600, 16, colors.black),
  },
  addBtnView: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: wp(122),
    justifyContent: 'space-around',
    borderRadius: 8,
    backgroundColor: colors.green_E4,
    marginTop: 20,
  },
  removeBtn: {
    position: 'absolute',
    bottom: 0,
  },
  btnText: {
    ...commonFontStyle(600, 16, colors.secondaryPrimary),
  },
  valueText: {
    ...commonFontStyle(700, 16, colors.black),
  },
  moreStyle: {
    height: wp(12),
    width: wp(12),
    resizeMode: 'contain',
    paddingVertical: 22,
  },
  stockText: {
    ...commonFontStyle(400, 14, colors.grey_70),
    marginVertical: 16,
  },
  radioView: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.grey_50,
  },
  radioMain: {
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    borderWidth: 1,
    marginRight: 14,
    marginVertical: 9,
    borderColor: colors.grey_5f,
  },
  radioText: {
    ...commonFontStyle(400, 14, colors.black),
  },
  order: {
    marginTop: hp(20),
    marginBottom: 10,
  },
  title: {
    ...commonFontStyle(600, 16, colors.black),
    marginBottom: hp(12),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.04,
    alignSelf: 'center',
  },
  button: {
    paddingHorizontal: wp(70),
  },
});
