import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../../../theme/colors';
import {commonFontStyle, hp, SCREEN_WIDTH} from '../../../../theme/fonts';

type HelpListViewProps = {
  title: string;
  dec: string;
  image: any;
  onPress?: () => void;
};

const HelpListView = ({title, dec, image, onPress}: HelpListViewProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={image} style={styles.imageStyle} resizeMode="contain" />
      <View style={{}}>
        <Text style={styles.headingText}>{title}</Text>
        <Text style={styles.valueText}>{dec}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HelpListView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey_5f,
    gap: hp(10),
  },
  imageStyle: {
    height: hp(30),
    width: hp(30),
  },
  headingText: {
    ...commonFontStyle(700, 16, colors.black),
  },
  valueText: {
    ...commonFontStyle(400, 16, colors.black),
    textAlign: 'left',
    width: SCREEN_WIDTH / 1.5,
  },
});
