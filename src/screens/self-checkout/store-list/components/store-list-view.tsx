import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {commonFontStyle, hp, SCREEN_WIDTH} from '../../../../theme/fonts';
import {Icons} from '../../../../assets';
import {colors} from '../../../../theme/colors';

interface IProps {
  containerStyle?: ViewStyle;
  image?: any;
  title?: string;
  value?: string;
  onPress?: () => void;
}
const StoreListView = ({
  containerStyle,
  image,
  title = 'Starbank Convenience #35',
  value = '456 Elm St, City, State, Zip',
  onPress,
}: IProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.container, ...containerStyle}}>
      <Image
        source={image || Icons.store_3}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <View style={{}}>
        <Text style={styles.headingText}>{title}</Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default StoreListView;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  imageStyle: {
    height: hp(60),
    width: hp(60),
  },
  headingText: {
    ...commonFontStyle(700, 16, colors.black),
  },
  valueText: {
    ...commonFontStyle(400, 16, colors.black),
    textAlign: 'left',
    width: SCREEN_WIDTH / 2.2,
  },
});
