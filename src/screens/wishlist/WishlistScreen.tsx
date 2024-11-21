/* eslint-disable react-native/no-inline-styles */
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../theme/colors';
import {Header} from '../../components/common';
import WishlistItem from '../../components/wishlist/WishlistItem';
import {commonFontStyle, wp} from '../../theme/fonts';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {addProduct, addWishList} from '../../redux/action/productAction';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';

const WishlistScreen = () => {
  const dispatch = useAppDispatch();
  const {wishListData} = useAppSelector(state => state.product);

  const removeWishList = (item: any) => {
    dispatch(addWishList(item));
  };
  const addToCart = (item: any) => {
    dispatch(addProduct(item));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'My Wish List'} />
      <View style={{marginHorizontal: wp(16), flex: 1}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{gap: 30}}
          contentContainerStyle={{
            ...styles.contentContainerStyle,
            alignSelf: wishListData.length === 1 ? 'flex-start' : 'center',
            marginLeft: wishListData.length === 1 ? wp(14) : 0,
          }}
          data={wishListData}
          renderItem={({item, index}) => {
            return (
              <WishlistItem
                productImage={item?.image}
                price={'$' + item?.price}
                name={item?.name}
                index={index}
                heartIcon={true}
                onPressIcon={() => {
                  addToCart(item);
                }}
                onPressHeart={() => {
                  removeWishList(item);
                }}
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
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.emptyText}>No Items in WishList</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default WishlistScreen;

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
