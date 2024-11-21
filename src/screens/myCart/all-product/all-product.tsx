/* eslint-disable react-native/no-inline-styles */
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {colors} from '../../../theme/colors';
import {Header} from '../../../components/common';
import {commonFontStyle} from '../../../theme/fonts';
import WishlistItem from '../../../components/wishlist/WishlistItem';
import CategoryList from '../components/category-list';
import {categories, products} from '../../../utils/dummyData';
import {navigationRef} from '../../../navigation/mainNavigator';
import {screenName} from '../../../navigation/screenNames';
import {addProduct, addWishList} from '../../../redux/action/productAction';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';

const AllProductScreen: FC<any> = ({navigation, route}) => {
  const {type, screen_name, productType} = route?.params || {};
  const dispatch = useAppDispatch();
  const {wishListData} = useAppSelector(state => state.product);

  const [categoryList, setCategoryList] = useState<any[]>([]);

  const [selectId, setSelectId] = useState<any>({
    storeID: 1,
    productType: 'Bakery',
  });
  const addToCart = (item: any) => {
    dispatch(addProduct(item));
  };
  const removeWishList = (item: any) => {
    dispatch(addWishList(item));
  };

  useEffect(() => {
    if (type === 'category') {
      const filterData: any = products.filter(
        (item: any) => item.storeID === selectId?.storeID,
      );

      Object.keys(productType).forEach((key: any) => {
        if (key === selectId.productType) {
          if (productType[key]) {
            setCategoryList(filterData[0].productImages);
          } else {
            setCategoryList([]);
          }
        }
      });
    } else if (type === 'all') {
      // Filter productsList based on the true/false values from the categories object
      const filteredProducts = products.filter(
        product => productType[product.product],
      );
      const mergedProductImages = filteredProducts.flatMap(
        product => product.productImages,
      );

      setCategoryList(mergedProductImages);
    } else {
      const productList = route?.params?.products;
      setCategoryList(productList);
    }
  }, [selectId]);

  return (
    <SafeAreaView style={styles.container}>
      <Header showLeftIcon={true} title={screen_name} />

      <View style={styles.container}>
        {type === 'category' ? (
          <CategoryList
            data={categories}
            selectId={selectId.storeID}
            setSelectId={setSelectId}
            selectType={'storeID'}
          />
        ) : null}
        <View style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{gap: 30}}
            contentContainerStyle={styles.contentContainerStyle}
            data={categoryList}
            renderItem={({item, index}: any) => {
              return (
                <WishlistItem
                  productImage={item?.image}
                  price={'$' + item?.price}
                  name={item?.name}
                  index={index}
                  isOffer={type === 'offers' ? true : false}
                  productIcon="cart"
                  onPressIcon={() => {
                    addToCart(item);
                  }}
                  heartIcon={false}
                  onPressHeart={() => {
                    removeWishList(item);
                  }}
                  isWishlist={wishListData.some(
                    (i: any) => i.name === item.name,
                  )}
                  onPress={() => {
                    navigationRef.navigate(screenName.ProductDetails, {
                      productItem: item,
                    });
                  }}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.emptyText}>No Items</Text>
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    paddingVertical: 10,
    alignSelf: 'center',
    flexGrow: 1,
  },
  emptyText: {
    ...commonFontStyle(400, 20, colors.secondaryPrimary),
  },
});
