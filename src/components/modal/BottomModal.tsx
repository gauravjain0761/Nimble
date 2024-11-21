//import liraries
import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomModalProps, HeaderProps} from '../../utils/types';
import {Icons} from '../../assets';
import {colors} from '../../theme/colors';
import {
  commonFontStyle,
  hp,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  wp,
} from '../../theme/fonts';
import ReactNativeModal from 'react-native-modal';
import {PrimaryButton} from '../common';
import {navigationRef} from '../../navigation/mainNavigator';
import {screenName} from '../../navigation/screenNames';

const BottomModal: FC<BottomModalProps> = ({
  isVisible,
  onClose,
  btnText,
  text1,
  onNextPress,
  onNextBtnPress,
  description,
}) => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimation(1);
  }, [isVisible]);

  const startAnimation = (id: 0) => {
    Animated.timing(progress, {
      toValue: id, // End point (1 or 100%)
      duration: 10000, // 3 seconds
      useNativeDriver: false, // Must be false when animating width
    }).start(({finished}) => {
      if (finished) {
        progress.resetAnimation();
        onClose();
        onNextBtnPress && onNextBtnPress();
      }
    });
  };

  const onCloseModal = () => {
    progress.resetAnimation();
    onClose();
    onNextPress();
  };

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ReactNativeModal
      isVisible={isVisible}
      statusBarTranslucent
      animationIn={'fadeInUpBig'}
      animationInTiming={1000}
      animationOutTiming={1000}
      style={{margin: 0, justifyContent: 'flex-end'}}>
      <View style={styles.container}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progress, {width}]} />
        </View>
        {<Text style={styles.text1}>{text1}</Text>}
        <Text style={styles.text2}>
          {description ?? 'You are $20 away from the order minimum.'}
        </Text>
        {btnText && (
          <View style={styles.buttonContainer}>
            <PrimaryButton
              type="fill"
              title={btnText}
              onPress={() => {
                onCloseModal();
              }}
              style={styles.button}
            />
          </View>
        )}
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green_E4,
    minHeight: SCREEN_HEIGHT * 0.2,
    // paddingHorizontal: 20,
    // paddingVertical: 20,
  },
  progressBar: {
    width: '100%',
    height: 10,
    // backgroundColor: '#e0e0e0',
    // borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: colors.secondaryPrimary,
    // borderRadius: 10,
  },
  titleTextStyle: {
    ...commonFontStyle(700, 18, colors.black),
    textAlign: 'center',
  },
  heartIconStyle: {
    height: wp(25),
    width: wp(25),
    marginTop: hp(1.7),
    tintColor: colors.black,
  },
  buttonContainer: {
    // position: 'absolute',
    // bottom: SCREEN_HEIGHT * 0.04,
    alignSelf: 'center',
    marginBottom: 40,
  },
  button: {
    paddingHorizontal: wp(60),
  },
  text1: {
    ...commonFontStyle(700, 16, colors.black),
    textAlign: 'center',
    marginTop: 30,
  },
  text2: {
    ...commonFontStyle(700, 16, colors.black),
    textAlign: 'center',
    marginBottom: 70,
    marginTop: 20,
    paddingHorizontal: 30,
  },
});

export default BottomModal;
