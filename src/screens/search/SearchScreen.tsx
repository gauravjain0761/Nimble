import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../theme/colors';
import {DropdownComponent, SearchInput} from '../../components/common';
import {Icons} from '../../assets';
import {
  addressList,
  dropDownData,
  dropDownData1,
  dropDownData2,
  dropDownDataDay,
  products,
  storeData,
} from '../../utils/dummyData';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {TrendingItem} from '../../components';
import {FlatList} from 'react-native-gesture-handler';
import {screenName} from '../../navigation/screenNames';
import {navigationRef} from '../../navigation/mainNavigator';
import {addProduct, addWishList} from '../../redux/action/productAction';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {CHANGE_TIME} from '../../redux/actionTypes';
import {successToast} from '../../utils/commonFunction';

const SearchScreen = () => {
  const {wishListData} = useAppSelector(state => state.product);
  const {address, time} = useAppSelector(state => state.common);

  const [searchText, setSearchText] = useState('');
  const [locationdropDown, setLocationDropDown] = useState('11113');
  const [dropDown2, setDropDown2] = useState(time.time);

  const [pickupDropDown, setPickupDropDown] = useState(time.date);
  const [filteredData, setFilteredData] = useState(storeData);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onPressStore = (item: any) => {
    navigation.navigate(screenName.StoreScreen, {item: item});
  };

  useEffect(() => {
    if (address) {
      // Regular expression to match the province and postal code
      const regex = /ON\s\w{3}\s\w{3}/;

      const result = address.match(regex);

      setLocationDropDown(result[0]);
    }
  }, [address]);
  const addToCart = (item: any) => {
    dispatch(addProduct(item));
  };
  const removeWishList = (item: any) => {
    dispatch(addWishList(item));
  };
  // Function to filter data
  const filterData = (query: string) => {
    const normalizedQuery = query.toLowerCase();

    const filteredStores = storeData.filter(store => {
      const isStoreMatch = store.name.toLowerCase().includes(normalizedQuery);

      // Check if any products in this store match the search
      const isProductMatch = products.some(
        product =>
          product.storeID === store.id &&
          product.productImages.some(p =>
            p.name.toLowerCase().includes(normalizedQuery),
          ),
      );

      return isStoreMatch || isProductMatch;
    });

    setFilteredData(filteredStores);
  };

  // Handle input change
  const handleSearch = (text: string) => {
    setSearchText(text);
    filterData(text);
  };
  const onChangeTime = (i: any, key: any) => {
    const payload = {
      date: time.date,
      time: time.time,
    };
    if (key === 'day') {
      payload.date = i;
    }
    if (key === 'time') {
      payload.time = i;
    }
    dispatch({type: CHANGE_TIME, payload: payload});
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchInput
          value={searchText}
          showClearIcon
          backButton
          showLeftIcon
          onPressClear={() => setSearchText('')}
          onChangeText={text => handleSearch(text)}
          onPressLeft={() => navigation.goBack()}
          placeholder={'Search by products name, stores'}
          style={styles.searchContainer}
        />
        <View style={styles.dropView}>
          <DropdownComponent
            data={addressList}
            containerStyle={styles.containerStyle}
            value={locationdropDown}
            setValue={setLocationDropDown}
            renderLeftIcon={Icons.ic_location}
            placeholder={'Address'}
            labelField="label"
            valueField="label"
          />
          <DropdownComponent
            data={dropDownDataDay}
            containerStyle={styles.containerStyle}
            value={pickupDropDown}
            setValue={(i: any) => {
              setPickupDropDown(i);
              onChangeTime(i, 'day');
            }}
            placeholder={'Today'}
          />
          <DropdownComponent
            data={dropDownData2}
            containerStyle={{width: '25%'}}
            value={dropDown2}
            setValue={(i: any) => {
              setDropDown2(i);
              onChangeTime(i, 'time');
            }}
            placeholder={'9:00 am'}
          />
        </View>
      </View>
      <FlatList
        data={filteredData}
        renderItem={({item, index}) => {
          return (
            <View style={styles.storeContainer}>
              <View style={styles.header}>
                <View style={styles.left}>
                  <View style={styles.image}>
                    <Image
                      resizeMode="contain"
                      source={item?.image}
                      style={styles.logo}
                    />
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.name}>{item?.name}</Text>
                    <Text style={styles.distance}>{item?.distance}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => onPressStore(item)}>
                  <Text style={styles.gostore}>{'Go to Store'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.detailcontainer}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={item?.products}
                  contentContainerStyle={{
                    paddingLeft: wp(16),
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <TrendingItem
                        containerStyle={styles.itemcontainer}
                        imageContainerStyle={styles.imageContainerStyle}
                        index={index}
                        images={item?.image}
                        amount={item?.price}
                        description={item?.name}
                        onPressAdd={() => {
                          addToCart(item);
                          successToast('Product added to cart');
                        }}
                        onPressHeart={() => {
                          removeWishList(item);
                        }}
                        isWishlist={wishListData.some(
                          (i: any) => i.name === item.name,
                        )}
                        onPress={() =>
                          navigationRef.navigate(screenName.ProductDetails, {
                            productItem: item,
                          })
                        }
                      />
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  dropView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(16),
    gap: wp(8),
    borderBottomWidth: hp(0.5),
    borderBottomColor: colors.grey_00,
    paddingBottom: hp(16),
  },
  containerStyle: {
    // width: '32%',
    flex: 1,
  },

  searchContainer: {
    marginTop: hp(24),
    marginBottom: hp(16),
    marginHorizontal: wp(16),
  },
  storeContainer: {
    paddingTop: wp(16),
    paddingBottom: hp(18),
    borderTopColor: colors.grey_00,
    borderBottomColor: colors.grey_00,
    borderBottomWidth: hp(0.5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: wp(16),
  },
  logo: {
    width: wp(40),
    height: wp(40),
  },
  content: {
    marginLeft: wp(13),
  },
  name: {
    ...commonFontStyle(600, 16, colors.black),
    lineHeight: hp(16),
  },
  distance: {
    ...commonFontStyle(500, 12, colors.black),
    marginTop: 4,
    lineHeight: hp(15),
  },
  gostore: {
    ...commonFontStyle(700, 14, colors.green_07),
    top: 5,
    lineHeight: hp(17),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    shadowColor: colors.grey_99,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  detailcontainer: {
    marginTop: hp(20),
    flex: 1,
  },
  itemcontainer: {
    marginRight: wp(21),
  },
  imageContainerStyle: {
    backgroundColor: colors.grey_F5,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: colors.grey_00,
  },
});
