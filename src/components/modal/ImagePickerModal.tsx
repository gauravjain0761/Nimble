import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, SCREEN_WIDTH} from '../../theme/fonts';
import {Icons} from '../../assets';
import ImagePicker from 'react-native-image-crop-picker';
import {
  CheckPermission,
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../utils/permission';

interface Props {
  isVisible?: boolean;
  onVisibleChange?: (value: boolean) => void;
  onFilePathSelect?: (value: any) => void;
}

interface ImageViewProps {
  image: any;
  onPress: () => void;
  title: string;
  style?: ViewStyle;
}

var options: any = {
  mediaType: 'photo',
  includeBase64: false,
  storageOptions: {
    skipBackup: true,
  },
  maxWidth: 200,
  maxHeight: 200,
  cropping: true,
};

const ImageView = ({image, onPress, title, style}: ImageViewProps) => {
  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={{...styles.imageView, ...style}}>
        <Image
          source={image}
          style={styles.imageStyle}
          tintColor={colors.white}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const ImagePickerModal = ({
  isVisible,
  onVisibleChange = () => {},
  onFilePathSelect = () => {},
}: Props) => {
  function onChange(value: any) {
    onVisibleChange(!isVisible);
    setTimeout(() => {
      if (value === 'Camera') {
        captureImage();
      } else if (value === 'Photo_Library') {
        chooseFile();
      }
    }, 600);
  }

  const chooseFile = async () => {
    try {
      const isStoragePermitted = await requestExternalWritePermission();

      if (isStoragePermitted) {
        let result: any = await ImagePicker.openPicker(options);

        const URl: any = {
          url: result.path,
        };
        if (URl) {
          onFilePathSelect(URl);
        }
      } else {
        CheckPermission();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const captureImage = async () => {
    try {
      const isCameraPermitted = await requestCameraPermission();

      if (isCameraPermitted) {
        let result: any = await ImagePicker.openCamera(options);
        const URl: any = {
          url: result.path,
        };
        if (URl) {
          onFilePathSelect(URl);
        }
      } else {
        CheckPermission();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      statusBarTranslucent
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onBackButtonPress={() => onChange(null)}
      onBackdropPress={() => onChange(null)}
      style={styles.modalContainer}>
      <View style={styles.container}>
        <ImageView
          image={Icons.gallery}
          title={'Select From\nGallery'}
          onPress={() => onChange('Photo_Library')}
        />
        <ImageView
          image={Icons.camera}
          title={'Take a Picture\nfrom Camera'}
          onPress={() => onChange('Camera')}
        />
      </View>
    </Modal>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    bottom: -20,
  },
  container: {
    width: SCREEN_WIDTH,
    height: 'auto',
    backgroundColor: colors.green_E4,
    padding: 20,
    paddingVertical: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...commonFontStyle(600, 20, colors.secondaryPrimary),
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  imageView: {
    height: hp(65),
    width: hp(65),
    backgroundColor: colors.secondaryPrimary,
    shadowColor: colors.white,
    elevation: 7,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4.65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  imageStyle: {
    height: 30,
    width: 30,
  },
});
