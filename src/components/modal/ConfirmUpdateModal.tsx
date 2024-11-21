import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {Icons} from '../../assets';
import {PrimaryButton} from '../common';
interface Props {
  isVisible?: boolean;
  onConfirm?: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

const ConfirmUpdateModal = ({
  isVisible,
  onConfirm = () => {},
  title = 'Your order\nhas been updated!',
  message = 'Your new total is $31.99.',
  buttonText = 'View Order Status',
}: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      statusBarTranslucent
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={{justifyContent: 'center'}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        <Image
          source={Icons.createapp}
          resizeMode="contain"
          style={styles.location}
        />
        <Text style={styles.messageText}>{message}</Text>

        <PrimaryButton type={'fill'} title={buttonText} onPress={onConfirm} />
      </View>
    </Modal>
  );
};

export default ConfirmUpdateModal;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.grey_F5,
    padding: 20,
    borderRadius: 10,
    gap: hp(20),
    paddingVertical: hp(50),
  },
  titleText: {
    ...commonFontStyle(600, 24, colors.black),
    textAlign: 'center',
  },
  location: {
    width: '100%',
    height: hp(163),
  },
  messageText: {
    ...commonFontStyle(600, 18, colors.black),
    textAlign: 'center',
  },
});
