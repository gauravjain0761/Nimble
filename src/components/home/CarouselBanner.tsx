import React, {useRef, useState} from 'react';
import {View, StyleSheet, ImageURISource} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {hp, isIos, SCREEN_HEIGHT, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import Banner from './Banner';

const CarouselBanner: FC = ({data, showImage}: any) => {
  const isCarousel: any = useRef(null);
  const [index, setIndex] = useState<number>(0);

  const _renderItem = ({item, index}: {item: any; index: number}) => (
    <Banner data={item} key={index} showImage={showImage} />
  );

  return (
    <View style={{}}>
      <Carousel
        data={data || []}
        loop={true}
        firstItem={0}
        autoplay={true}
        ref={isCarousel}
        layout={'default'}
        useScrollView={false}
        // autoplayDelay={1000}
        // autoplayInterval={1000}
        // @ts-ignore
        renderItem={_renderItem}
        itemWidth={SCREEN_WIDTH}
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={SCREEN_HEIGHT / 2}
        onSnapToItem={(index: number) => setIndex(index)}
      />
      <View
        style={[styles.paginationContainer, {bottom: showImage ? -18 : -10}]}>
        <Pagination
          tappableDots={true}
          animatedFriction={3}
          animatedTension={500}
          activeDotIndex={index}
          inactiveDotScale={0.9}
          inactiveDotOpacity={0.9}
          carouselRef={isCarousel}
          dotsLength={data?.length}
          dotStyle={[
            styles.dotStyle,
            {marginHorizontal: showImage ? wp(-6) : wp(-3)},
          ]}
          containerStyle={styles.containerStyle}
          inactiveDotStyle={[
            styles.inactiveDotStyle,
            {
              backgroundColor: showImage ? colors.grey_D9 : colors.white,
              marginHorizontal: showImage ? wp(-6) : wp(-3),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  paginationContainer: {
    position: 'absolute',
    bottom: -24,
    alignSelf: 'center',
  },
  itemImageStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2,
  },
  dotStyle: {
    width: wp(8),
    height: hp(8),
    borderRadius: wp(5),
    backgroundColor: colors.secondaryPrimary,
    shadowColor: colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: wp(5),
    elevation: 5,
  },
  inactiveDotStyle: {
    width: wp(8),
    height: hp(8),
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  containerStyle: {
    alignSelf: 'flex-end',
  },
  backIconStyle: {
    left: wp(16),
    position: 'absolute',
    top: isIos ? hp(16) : hp(20),
  },
  iconStyle: {
    height: hp(22),
    width: hp(22),
  },
  heartIconStyle: {
    right: wp(16),
    position: 'absolute',
    top: isIos ? hp(16) : hp(20),
  },
});

export default CarouselBanner;
