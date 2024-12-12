import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Icons} from '../../assets';
import {commonFontStyle, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';

const dataList = [
  {id: 1, name: 'Placed', icons: Icons.placed},
  {id: 2, name: 'Confirmed', icons: Icons.confirmed},
  {id: 3, name: 'Preparing', icons: Icons.preparing},
  {id: 4, name: 'Ready', icons: Icons.ready},
  {id: 5, name: 'Collected', icons: Icons.collected},
];

const statusValue = (status: any) => {
  switch (status) {
    case 'Placed':
      return 1;
    case 'Confirmed':
      return 2;
    case 'Preparing':
      return 3;
    case 'Ready':
      return 4;
    case 'Collected':
      return 5;
    default:
      return 1;
  }
};

interface IProps {
  name?: string;
  outOfStock?: boolean;
  cancelOrder?: boolean;
  onStatusPress?: (status: string) => void; // Callback for button press
}

const OrderStatusTimeline = ({
  name = 'Placed',
  outOfStock,
  cancelOrder,
  onStatusPress,
}: IProps) => {
  return (
    <View
      style={[
        styles.container,
        name === 'Confirmed' && outOfStock && {marginBottom: 40},
      ]}>
      {dataList?.map((item, index) => (
        <React.Fragment key={item.id}>
          {index !== 0 && (
            <Image source={Icons.ic_dotLine} style={styles.line} />
          )}
          <TouchableOpacity
            style={styles.statusItem}
            onPress={() => onStatusPress?.(item.name)} // Handle button press
          >
            <View
              style={[
                styles.iconContainer,
                index < statusValue(name) && styles.active,
              ]}>
              <Image
                source={
                  item?.name === 'Collected' && cancelOrder
                    ? Icons.close
                    : item?.name === 'Confirmed'
                    ? outOfStock
                      ? Icons.need
                      : item.icons
                    : item.icons
                }
                style={[
                  styles.cartImage,
                  index < statusValue(name) && styles.activeIcon,
                ]}
              />
            </View>
            <Text
              style={[
                styles.statusText,
                styles.activeText,
                item?.name === 'Confirmed' && outOfStock && {bottom: -35},
              ]}>
              {item?.name === 'Collected' && cancelOrder
                ? 'Cancelled'
                : item?.name === 'Confirmed'
                ? outOfStock
                  ? 'Needs\nReview'
                  : item?.name
                : item?.name}
            </Text>
          </TouchableOpacity>
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'center',
    marginBottom: 35,
  },
  statusItem: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  active: {
    backgroundColor: '#E7F4E4',
  },
  activeIcon: {
    tintColor: '#5F6368',
  },
  statusText: {
    position: 'absolute',
    bottom: -18,
    width: wp(80),
    textAlign: 'center',
    ...commonFontStyle(600, 14, colors.black),
  },
  activeText: {
    color: '#00473E',
  },
  line: {
    height: 1,
    width: SCREEN_WIDTH * 0.12,
    borderStyle: 'dotted',
    borderWidth: 0.5,
  },
  cartImage: {
    width: 24,
    height: 24,
  },
});

export default OrderStatusTimeline;
