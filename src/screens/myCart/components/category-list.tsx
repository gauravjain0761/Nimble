/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../../../theme/colors';
import {commonFontStyle, hp, wp} from '../../../theme/fonts';

interface Props {
  data: any;
  setSelectId: (id: number) => void;
  selectId: number;
  selectType?: string;
}

const CategoryList = ({data, setSelectId, selectId, selectType}: Props) => {
  const ref = useRef<any>(null);
  const [_index, setIndex] = useState<number>(0);
  useEffect(() => {
    if (ref?.current) {
      ref?.current?.scrollToIndex({
        index: _index,
        animated: true,
      });
    }
  }, [_index]);
  return (
    <View>
      <FlatList
        ref={ref}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item, index}: any) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectId(item);
                setIndex(index);
              }}
              style={[
                styles.categoriesItem,
                {
                  borderWidth:
                    selectId === (selectType ? item[selectType] : item?.id)
                      ? 1.5
                      : 0,
                },
              ]}>
              <Text style={styles.categoriesTitle}>{item?.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  contentContainerStyle: {
    marginHorizontal: wp(16),
    paddingRight: wp(20),
    gap: 8,
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
});
