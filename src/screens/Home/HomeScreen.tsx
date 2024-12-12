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
import {colors} from '../../theme/colors';
import {Icons} from '../../assets';
import {commonFontStyle, wp} from '../../theme/fonts';
import {
  addressList,
  carouselBanner,
  dropDownData,
  dropDownData1,
  dropDownData2,
  dropDownDataDay,
  products,
  storeData,
  storeDataList,
} from '../../utils/dummyData';
import {CarouselBanner, StoreItem, TrendingItem} from '../../components';
import {DropdownComponent, SearchInput} from '../../components/common';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {screenName} from '../../navigation/screenNames';
import {navigationRef} from '../../navigation/mainNavigator';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  addProduct,
  addWishList,
  disconnectSocket,
  receiveNotification,
  setSocket,
} from '../../redux/action/productAction';
import {CHANGE_TIME, USER_DATA} from '../../redux/actionTypes';
import {onGetUser} from '../../action/accountAction';
import {infoToast, successToast} from '../../utils/commonFunction';
import {io} from 'socket.io-client';
import {useDispatch} from 'react-redux';
import store from '../../redux';

interface HeaderViewProps {
  title: string;
  style?: any;
  onPress?: () => void;
}

const HeaderView = ({title, style, onPress}: HeaderViewProps) => {
  return (
    <View style={[styles.headerListStyle, style]}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text onPress={onPress} style={styles.seeAllText}>
        {'See All >'}
      </Text>
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {userData, isLogin} = useAppSelector(state => state.common);
  const isFocused = useIsFocused();
  const {wishListData} = useAppSelector(state => state.product);
  const {address, time} = useAppSelector(state => state.common);
  const [selectTab, setSelectTab] = useState(1);

  const [dropDown, setDropDown] = useState('');

  const [dropDown1, setDropDown1] = useState(time.date || 'Today');
  const [dropDown2, setDropDown2] = useState(time.time || '9:00 am');
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    if (isLogin) {
      onGetUserData();
    }
  }, [isLogin]);

  const onGetUserData = () => {
    let UserInfo = {
      data: {
        email: userData.email,
      },
      onSuccess: (res: any) => {
        console.log('res', res);
        const _user = res.user;
        dispatch({type: USER_DATA, payload: _user});
      },
      onFailure: (Err: any) => {
        console.log('Err', Err);
      },
    };
    dispatch(onGetUser(UserInfo));
  };

  useEffect(() => {
    if (selectTab === 2) {
      navigation.navigate(screenName.SelfCheckoutScreen);
      setSelectTab(1);
    }
  }, [navigation, selectTab]);

  useEffect(() => {
    if (address) {
      // Regular expression to match the province and postal code
      const regex = /ON\s\w{3}\s\w{3}/;

      const result = address.match(regex);

      setDropDown(result[0]);
    }
  }, [address]);

  const WebSocketComponent = ({userId}: {userId: string}) => {
    const connectSocket = () => {
      const socketInstance = io('wss://nimble-backend-services.onrender.com', {
        transports: ['websocket'],
      });

      socketInstance.on('connect', () => {
        console.log('Socket.IO connected');
        infoToast('Websocket is connected');
        console.log('Websocket join room start');
        socketInstance.emit(
          'join_user_room',
          '670d0e1b7fd8a344b87bedb0',
          response => {
            console.log('Room joined response:', response);
            console.log('Websocket joissssn room end');
          },
        );
      });

      // Handling server responses
      socketInstance.on('room_joined', message => {
        infoToast('Room joined successfully');
      });

      socketInstance.on('notification', notification => {
        console.log('Received notification:', notification);
        store.dispatch(receiveNotification(notification));
      });

      // Listening for notifications
      // socketInstance.on('notification', notification => {
      //   console.log('Received notification:', notification);
      // });

      // Dispatch the socket instance to Redux store
      dispatch(setSocket(socketInstance));
    };
    connectSocket();

    // Automatically connect socket when component mounts
    // useEffect(() => {

    //   // Cleanup function to disconnect the socket when the component unmounts
    //   return () => {
    //     if (socket) {
    //       socket.disconnect();
    //       dispatch(disconnectSocket());
    //       console.log('Socket.IO manually disconnected');
    //     }
    //   };
    // }, [userId]);

    // Handle logout and socket disconnection using Redux
  };

  useEffect(() => {
    WebSocketComponent('670d0e1b7fd8a344b87bedb0');
  }, [isFocused]);

  useEffect(() => {
    if (time) {
      setDropDown1(time.date || 'Today');
      setDropDown2(time.time || '9:00 am');
    }
  }, [time]);

  const onPressSearch = () => {
    // navigate to search screen
    navigation.navigate(screenName.SearchScreen);
  };
  const onPressStore = (item: any) => {
    navigation.navigate(screenName.StoreScreen, {item: item});
  };
  const addToCart = (item: any) => {
    dispatch(addProduct(item));
  };
  const removeWishList = (item: any) => {
    dispatch(addWishList(item));
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
      <Image source={Icons.logohome} style={styles.logohome} />
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            setSelectTab(1);
          }}
          style={[
            styles.headerBtn,
            {
              borderWidth: selectTab == 1 ? 1.2 : 0,
              backgroundColor: selectTab == 1 ? colors.tabBg : colors.white,
              borderRightWidth: selectTab == 1 ? 2.5 : 0,
            },
          ]}>
          <Text style={styles.headerBtnText}>Order & Pickup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectTab(2);
          }}
          style={[
            styles.headerBtn,
            {
              borderWidth: selectTab == 2 ? 1.4 : 0,
              backgroundColor: selectTab == 2 ? colors.tabBg : colors.white,
              borderLeftWidth: selectTab == 2 ? 2.5 : 0,
            },
          ]}>
          <Text style={styles.headerBtnText}>Self Check-out</Text>
        </TouchableOpacity>
      </View>

      {selectTab === 1 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <CarouselBanner data={carouselBanner} />
          <View style={styles.dropView}>
            <DropdownComponent
              data={addressList}
              containerStyle={{width: '40%'}}
              value={dropDown}
              setValue={i => {
                setDropDown(i);
              }}
              renderLeftIcon={Icons.ic_location}
              placeholder={'Address'}
              labelField="label"
              valueField="label"
            />
            <DropdownComponent
              data={dropDownDataDay}
              containerStyle={{width: '32%'}}
              value={dropDown1}
              setValue={(i: any) => {
                setDropDown1(i);
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
          <TouchableOpacity onPress={onPressSearch}>
            <SearchInput
              value={searchText}
              disabled={true}
              rightIcon={Icons.voice}
              onChangeText={text => setSearchText(text)}
              placeholder={'Search by products name, stores'}
              style={{width: '93%', marginTop: 12, marginBottom: 20}}
            />
          </TouchableOpacity>
          <HeaderView
            title={'Stores Near You '}
            onPress={onPressSearch}
            style={{marginVertical: 20}}
          />
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{paddingRight: 16, paddingTop: 3}}
              data={storeData}
              renderItem={({item, index}: any) => {
                return (
                  <StoreItem
                    key={index}
                    image={item.image}
                    title={item.name}
                    onPress={() => onPressStore(item)}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <HeaderView
            title={'Trending at Starbank Convenience'}
            style={{marginVertical: 20}}
            onPress={() => {
              navigationRef.navigate(screenName.AllProductScreen, {
                screen_name: 'Trending at Starbank Convenience',
                type: 'trending',
                products: products[2].productImages,
              });
            }}
          />
          <View style={{marginLeft: 16}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={products[2].productImages}
              renderItem={({item, index}) => {
                return (
                  <TrendingItem
                    onPress={() =>
                      navigationRef.navigate(screenName.ProductDetails, {
                        productItem: item,
                      })
                    }
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
                    images={item.image}
                    amount={item.price}
                    description={item.name}
                    index={index}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={{height: 50}} />
        </ScrollView>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logohome: {
    width: 62,
    height: 42,
    alignSelf: 'center',
  },
  headerView: {
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 24,
    borderRadius: 24,
    justifyContent: 'space-around',
    marginBottom: 10,
    borderColor: colors.grey_DA,
  },
  headerBtn: {
    flexDirection: 'row',
    borderRadius: 24,
    flex: 1,
    justifyContent: 'center',
    borderColor: colors.borderColor,
    height: 32,
    alignItems: 'center',
  },
  headerBtnText: {
    ...commonFontStyle(400, 14, colors?.black),
  },
  dropView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 5,
    marginTop: 8,
  },
  containerStyle: {
    width: '29%',
  },
  containerStyle1: {
    width: '39%',
  },
  containerStyle2: {
    width: '26%',
  },
  headerListStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  titleStyle: {
    ...commonFontStyle(600, 18, colors?.black),
  },
  seeAllText: {
    ...commonFontStyle(400, 14, 'rgba(7, 79, 81, 0.6)'),
  },
});
