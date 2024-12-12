/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../theme/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Icons} from '../../assets';
import {commonFontStyle, hp, isIos, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {SearchInput} from '../../components/common';
import {TrendingItem} from '../../components';
import {categories, products, storeData} from '../../utils/dummyData';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';
import {addProduct, addWishList} from '../../redux/action/productAction';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {UPDATE_ORDER_LIST} from '../../redux/actionTypes';
import {infoToast, successToast} from '../../utils/commonFunction';

const StoreScreen = () => {
  const {params}: any = useRoute();
  const {image, name, id, productType} = params?.item || {};
  const insets = useSafeAreaInsets();
  const [cartCount, setCartCount] = useState(0);

  const {data, orderListData, wishListData} = useAppSelector(
    state => state.product,
  );

  console.log('orderListData', orderListData);
  console.log('params?.item', params?.item);
  const [search, setSearch] = useState('');
  const [selectId, setSelectId] = useState<any>({
    storeID: 1,
    productType: 'Bakery',
  });
  const [productsList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (data) {
      const newCartData = associateProductsWithStores(storeData, data);
      setCartCount(newCartData.length);
    }
  }, [data]);

  const associateProductsWithStores = (stores: any, product: any) => {
    return stores
      .map((store: any) => {
        const storeProducts = product.filter(
          (pro: any) => pro.storeID === store.id,
        );
        return {
          ...store,
          products: storeProducts.length > 0 ? storeProducts : undefined, // Set to undefined if no products
        };
      })
      .filter((store: any) => store.products); // Filter out stores with no products
  };

  const onPressBack = () => {
    navigation.goBack();
  };
  const addToCart = (item: any) => {
    dispatch(addProduct(item));
  };
  const removeWishList = (item: any) => {
    dispatch(addWishList(item));
  };

  useEffect(() => {
    if (params?.item?.storeData?.id || id) {
      const newProductData: any = products.filter(
        i => i?.storeID === (params?.item?.storeData?.id || id),
      );
      setProductsList(newProductData[0].productImages);
    }
  }, [id, params]);

  useEffect(() => {
    const filterData: any = products.filter(
      (item: any) => item.storeID === selectId?.storeID,
    );

    if (productType || params?.item.storeData?.productType) {
      Object.keys(params?.item.storeData?.productType || productType).forEach(
        (key: any) => {
          if (key === selectId.productType) {
            const useKey =
              params?.item.storeData?.productType[key] || productType[key];
            if (useKey) {
              const filteredDrinks = filterData[0].productImages.filter(
                (drink: any) => ![5, 10, 11].includes(drink.id),
              );

              if (id === 2 || id === 3) {
                setCategoryList(filteredDrinks);
              } else {
                setCategoryList(filterData[0].productImages);
              }
            } else {
              setCategoryList([]);
            }
          }
        },
      );
    }
  }, [productType, selectId]);

  const addOrderNewItem = (item: any) => {
    console.log('params?.item?.products', item);
    const [filterProduct] = orderListData?.filter((item: any) => {
      return item?.storeData?.id === (params?.item?.storeData?.id || id);
    });

    if (filterProduct?.products?.some((i: any) => i?.name === item?.name)) {
      infoToast('Item already added');
    } else {
      dispatch({
        type: UPDATE_ORDER_LIST,
        payload: {
          newProduct: item,
          storeId: params?.item?.storeData?.id || id,
        },
      });
    }
  };

  return (
    <View style={[styles.container, {}]}>
      <StatusBar backgroundColor={colors.cream_FF} />
      <View
        style={[
          styles.headerbg,
          {paddingTop: isIos ? insets.top : insets.top + 12},
        ]}>
        <View style={{...styles.header, marginHorizontal: wp(16)}}>
          <TouchableOpacity onPress={onPressBack}>
            <Image
              resizeMode="cover"
              source={Icons.backArrow}
              style={styles?.backarrow}
            />
          </TouchableOpacity>
          <Image source={image} style={styles.logo} resizeMode="contain" />
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screenName.tabBarName.MyCartScreen)
              }>
              <Image source={Icons.myCart} style={styles.more} />
              {cartCount > 0 && (
                <View style={styles.countConatiner}>
                  <Text style={styles.countTextStyle}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Icons.more} style={styles.more} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.name}>{name}</Text>
        <SearchInput
          style={styles.searchBar}
          value={search}
          placeholderColor={colors.blue_32}
          onChangeText={e => setSearch(e)}
          leftIcon={Icons.search}
          showLeftIcon
          placeholder="Search in this store"
          inputStyle={{...commonFontStyle(400, 14, colors?.black)}}
        />
      </View>
      <ScrollView style={styles.containt}>
        <View style={styles.order}>
          <Text style={styles.title}>{'Order again'}</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={productsList.filter((item: any) =>
              item.name.toLowerCase().includes(search.toLowerCase()),
            )}
            renderItem={({item, index}: any) => {
              return (
                <TrendingItem
                  containerStyle={styles.itemcontainer}
                  index={index}
                  description={item?.name}
                  images={item?.image}
                  amount={item?.price}
                  onPressAdd={() => {
                    if (params?.type === 'modify') {
                      addOrderNewItem(item);
                      successToast('Product added to cart');
                    } else {
                      successToast('Product added to cart');
                      addToCart(item);
                    }
                  }}
                  onPressHeart={() => {
                    removeWishList(item);
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
        <View style={styles.offer}>
          <Text style={{...styles.title, marginHorizontal: wp(16)}}>
            {'Exclusive Offers'}
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={[1]}
            contentContainerStyle={{gap: wp(16), paddingHorizontal: wp(16)}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.offerPress}
                  onPress={() => {
                    navigationRef.navigate(screenName.AllProductScreen, {
                      type: 'offers',
                      screen_name: 'Exclusive Offers',
                      products: productsList,
                    });
                  }}>
                  <View style={styles.offerView}>
                    <Image
                      resizeMode="cover"
                      source={index === 0 ? Icons.offer_5 : Icons.offer_6}
                      style={styles.offerbg}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={styles.categories}>
          <View style={styles.rowHader}>
            <Text style={styles.title}>Shop by Categories</Text>
            <TouchableOpacity
              onPress={() => {
                navigationRef.navigate(screenName.AllProductScreen, {
                  type: 'category',
                  screen_name: 'Categories',
                  products: productsList,
                  productType: productType,
                });
              }}>
              <Text style={styles.viewall}>{'View All >'}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginHorizontal: wp(16),
              paddingRight: 12,
              gap: 8,
            }}
            renderItem={({item}: any) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectId(item);
                  }}
                  style={[
                    styles.categoriesItem,
                    {
                      borderWidth: selectId.storeID === item?.storeID ? 2 : 0,
                    },
                  ]}>
                  <Text style={styles.categoriesTitle}>{item?.title}</Text>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={() => <View style={{width: 10}} />}
          />
          {categoryList.length === 0 ? (
            <View style={{paddingTop: 40}}>
              <Text style={styles.emptyText}>
                There is no items in this category
              </Text>
            </View>
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={categoryList}
              contentContainerStyle={{
                marginHorizontal: wp(16),
                marginTop: hp(20),
                flexGrow: 1,
              }}
              renderItem={({item, index}) => {
                return (
                  <TrendingItem
                    containerStyle={styles.itemcontainer}
                    index={index}
                    description={item?.name}
                    images={item?.image}
                    amount={item?.price}
                    onPressAdd={() => {
                      successToast('Product added to cart');
                      if (params?.type === 'modify') {
                        addOrderNewItem(item);
                      } else {
                        addToCart(item);
                      }
                    }}
                    onPressHeart={() => {
                      removeWishList(item);
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
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigationRef.navigate(screenName.AllProductScreen, {
              type: 'all',
              screen_name: name,
              products: productsList,
              productType: productType,
            });
          }}>
          <Text style={styles.viewAllText}>
            {'View All 34 Products from all Categories >'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.cream_FF,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  backarrow: {
    width: wp(36),
    height: wp(36),
  },
  logo: {
    width: wp(50),
    height: wp(50),
  },
  more: {
    width: wp(24),
    height: wp(24),
  },
  headerbg: {
    backgroundColor: colors.cream_FF,
    paddingBottom: hp(18),
  },
  name: {
    ...commonFontStyle(700, 16, colors.black),
    lineHeight: hp(17),
    marginTop: hp(6),
    alignSelf: 'center',
  },
  searchBar: {
    backgroundColor: colors.white,
    marginHorizontal: wp(16),
    marginTop: hp(12),
  },
  order: {
    marginHorizontal: wp(16),
    marginTop: hp(18),
  },
  title: {
    ...commonFontStyle(600, 16, colors.black),
    marginBottom: hp(11),
  },
  itemcontainer: {
    marginRight: wp(21),
  },
  offer: {
    marginTop: hp(28),
  },
  offerView: {
    width: SCREEN_WIDTH / 1.1,
    height: hp(120),
    borderRadius: 10,
    overflow: 'hidden',
  },
  offerbg: {
    width: '100%',
    height: '100%',
  },
  offerPress: {
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopText: {
    ...commonFontStyle(600, 14, colors.black),
  },
  shopbtn: {
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    backgroundColor: colors.white,
    borderRadius: 8,
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginBottom: hp(13),
    marginRight: wp(11),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowHader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(16),
  },
  viewall: {
    ...commonFontStyle(400, 14, colors.secondaryPrimary),
  },
  categories: {
    marginTop: hp(28),
  },
  categoriesItem: {
    backgroundColor: colors?.green_E4,
    paddingHorizontal: wp(16),
    paddingVertical: hp(18),
    borderRadius: 8,
    borderColor: colors.secondaryPrimary,
  },
  categoriesTitle: {
    ...commonFontStyle(400, 14, colors.black),
  },
  containt: {
    flex: 1,
  },
  viewAllText: {
    ...commonFontStyle(400, 14, colors.green_39),
    paddingVertical: 30,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyText: {
    ...commonFontStyle(400, 18, colors.secondaryPrimary),
    textAlign: 'center',
  },
  countConatiner: {
    top: -10,
    right: wp(-10),
    width: wp(20),
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
