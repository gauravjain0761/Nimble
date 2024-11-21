import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {AppStyles} from '../../theme/appStyles';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {onboardingData} from '../../utils/dummyData';
import {onboarding} from '../../utils/types';
import {
  commonFontStyle,
  fontSize,
  hp,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  wp,
} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {PrimaryButton} from '../../components/common';
import {dispatchNavigation} from '../../utils/globalFunctions';
import {screenName} from '../../navigation/screenNames';

const Onboarding = () => {
  const [index, setIndex] = useState(0);
  const flatlistRef = useRef(null);

  const onPressNext = useCallback(() => {
    if (index < 2) {
      flatlistRef?.current?.scrollToIndex({
        index: index + 1,
        animated: true,
      });
    } else {
      dispatchNavigation(screenName.SelectService);
    }
  }, [index, flatlistRef]);

  const onPressSkip = () => {
    dispatchNavigation(screenName.SelectService);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.swiper}>
        <SwiperFlatList
          data={onboardingData}
          index={index}
          ref={flatlistRef}
          onChangeIndex={({index}) => {
            setIndex(index);
          }}
          showPagination
          paginationStyle={{top: SCREEN_HEIGHT / 1.6}}
          paginationStyleItemActive={styles.activeDot}
          paginationStyleItemInactive={styles.inactiveDot}
          renderItem={({item}: onboarding) => (
            <View style={styles.imageview}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={item?.image}
              />
            </View>
          )}
        />
        <Text style={styles.title}>{onboardingData[index]?.title}</Text>
        <Text style={styles.content}>{onboardingData[index]?.content}</Text>
      </View>
      <View style={styles.buttons}>
        <PrimaryButton
          style={styles.button}
          title="Next"
          onPress={onPressNext}
        />
        {index === 0 && (
          <TouchableOpacity onPress={onPressSkip} style={styles.skipbutton}>
            <Text style={styles.skipTitle}>{'Skip'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.white,
    // alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    width: SCREEN_WIDTH,
    height: hp(284),
  },
  activeDot: {
    backgroundColor: colors.secondaryPrimary,
    height: 10,
    width: 10,
    marginHorizontal: 5,
  },
  inactiveDot: {
    backgroundColor: colors.grey,
    height: 10,
    width: 10,
    marginHorizontal: 5,
  },
  title: {
    ...commonFontStyle(600, 24, colors.black),
  },
  content: {
    ...commonFontStyle(500, 16, colors.grey_80),
    textAlign: 'center',
    maxWidth: wp(270),
  },
  imageview: {
    marginTop: hp(54),
  },
  swiper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT / 1.7,
    gap: hp(24),
  },
  buttons: {
    alignSelf: 'center',
    marginBottom: hp(54),
    gap: hp(24),
  },
  button: {
    paddingHorizontal: wp(100),
  },
  skipbutton: {},
  skipTitle: {
    ...commonFontStyle(400, 18, colors.grey_80),
    lineHeight: hp(21),
    textAlign: 'center',
  },
});
