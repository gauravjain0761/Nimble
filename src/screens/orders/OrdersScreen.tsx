/* eslint-disable react-native/no-inline-styles */
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../theme/colors';
import {Header} from '../../components/common';
import {CartItem, OrdersItem} from '../../components';
import {commonFontStyle, wp} from '../../theme/fonts';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';
import {useAppSelector} from '../../redux/hooks';
import {storeData} from '../../utils/dummyData';

const OrdersScreen = () => {
  const {orderListData} = useAppSelector(state => state.product);

  const [orderList, setOrderList] = useState<any>([]);
  useEffect(() => {
    if (orderListData) {
      setOrderList(orderListData);
    }
  }, [orderListData]);

  console.log('orderListData', orderListData);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Orders'} />
      <View style={{marginHorizontal: wp(16), flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orderList}
          contentContainerStyle={{flexGrow: 1}}
          renderItem={({item, index}) => {
            return (
              <OrdersItem
                index={index}
                image={item?.storeData.image}
                name={item?.storeData.name}
                price={Number(item?.price.total).toFixed(2)}
                time={item?.time.time + ' ' + item?.time.date}
                status={item?.status}
                onPressViewOrder={() => {
                  navigationRef.navigate(screenName.OrdersStatusScreen, {
                    type: 'order',
                    orderData: item,
                  });
                }}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.emptyText}>No Items in Orders</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  emptyText: {
    ...commonFontStyle(400, 20, colors.secondaryPrimary),
  },
});
