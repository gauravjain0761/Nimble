import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../theme/colors';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../../theme/fonts';
import {Header, PrimaryButton} from '../../../components/common';
import HeaderExit from '../../../components/common/HeaderExit';
import {Icons} from '../../../assets';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Slider from '../../../components/common/Slider';
import {products} from '../../../utils/dummyData';

const BardcodeScanner = ({}) => {
  const camera = useRef(null);
  const device = useCameraDevice('back');

  const [showCamera, setShowCamera] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [matchedProductData, setMatchedProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [cartAmount, setCartAmount] = useState(0);

  // const allProducts = [
  //   {
  //     id: 1,
  //     name: 'Fantasy',
  //     tags: ['Dark', 'Fantasy', 'Choco', 'Fills'],
  //     price: '0.20',
  //     description: 'Dark Fantasy Cookie ',
  //     img: Icons.darkFantasy,
  //     qrCode: '98372891038748',
  //   },
  //   {
  //     id: 2,
  //     name: 'Parle-G',
  //     tags: ['Parle', 'G', 'Royale', 'Biscuit'],
  //     price: '0.10',
  //     description: 'Parle-G Biscuit 1 Packet',
  //     img: Icons.darkFantasy,
  //     qrCode: '8901719128608',
  //   },
  // ];

  const codeScanner = useCodeScanner({
    codeTypes: [
      'ean-13',
      'ean-8',
      'upc-a',
      'upc-e',
      'code-128',
      'code-39',
      'pdf-417',
      'aztec',
      'data-matrix',
      'codabar',
      'itf',
    ],
    onCodeScanned: codes => {
      if (codes.length) {
        const scannedCode = codes[0].value;
        console.log(`Scanned Code: ${codes[0].type} - ${scannedCode}`);

        // Find product matching the QR code
        const product = products[2].productImages.find(
          item => item.barcode === scannedCode,
        );
        if (product) {
          setMatchedProductData(product);
          setIsModalVisible(true);
          setShowCamera(false);
        } else {
          setShowCamera(false);
          Alert.alert(
            'Product not found', // Title of the alert
            'Please try scanning again.', // Message of the alert
            [
              {
                text: 'OK', // Button text
                onPress: () => {
                  setShowCamera(true);
                },
              },
            ],
            {cancelable: false}, // Optional, to prevent dismissing the alert by tapping outside
          );
        }
      }
    },
  });

  const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);
  const handleDecreaseQuantity = () =>
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleAddToOrder = () => {
    setCartCount(prevCount => prevCount + quantity);
    setCartAmount(
      prevAmount =>
        prevAmount + parseFloat(matchedProductData.price) * quantity,
    );
    setIsModalVisible(false);

    // Restart scanning by toggling camera on and off
    setShowCamera(false); // Turn off camera temporarily
    setTimeout(() => setShowCamera(true), 300); // Turn it back on after a short delay
  };

  useEffect(() => {
    async function checkPermissions() {
      const status = await Camera.requestCameraPermission();

      if (status !== 'granted') {
        Alert.alert('Camera permission is required to scan barcodes.');
      }
    }
    checkPermissions();
  }, []);

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderExit showLeftIcon showRightIcon showLogo />
      <View style={styles.cameraContainer}>
        {showCamera && (
          <>
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={showCamera}
              codeScanner={codeScanner}
            />
            <Image
              source={Icons.cameraScanner}
              style={{alignSelf: 'center', top: '25%'}}
            />
          </>
        )}
      </View>
      <View style={styles.cartContainer}>
        <View style={styles.cartInfo}>
          <Image source={Icons.cart} style={styles.cartIcon} />
          <Text style={styles.cartCount}>{cartCount}</Text>
          <Text style={styles.cartAmount}>${cartAmount.toFixed(2)}</Text>
        </View>
        {cartCount > 0 && (
          <Slider
            cartItems={{
              count: cartCount,
              amount: cartAmount.toFixed(2),
              matchedProductData,
            }}
          />
        )}
      </View>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        {matchedProductData ? (
          <View style={[styles.modalContainer, styles.productModalContainer]}>
            <Text
              onPress={() => {
                setIsModalVisible(false);
                setShowCamera(true);
              }}
              style={styles.discardText}>
              Discard
            </Text>
            <Image
              source={matchedProductData?.image}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{matchedProductData?.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                ${(parseFloat(matchedProductData?.price) * quantity).toFixed(2)}
              </Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={handleDecreaseQuantity}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityNumber}>{quantity}</Text>
                <TouchableOpacity onPress={handleIncreaseQuantity}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <PrimaryButton
              title="Add to Order"
              onPress={handleAddToOrder}
              style={styles.addButton}
            />
          </View>
        ) : (
          <View style={styles.modalContainer}>
            <ActivityIndicator size={'large'} color={colors.secondaryPrimary} />
            <Text style={styles.modalText}>Recognizing your item...</Text>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default BardcodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  exit: {
    ...commonFontStyle(400, 16, colors.black),
  },
  cameraContainer: {
    height: '60%',
    width: SCREEN_WIDTH,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cameraButton: {
    position: 'absolute',
    bottom: hp(20),
    alignSelf: 'center',
    alignItems: 'center',
    gap: hp(15),
  },
  buttonContainer: {
    height: hp(50),
    width: hp(50),
    borderRadius: hp(30),
    backgroundColor: colors.white,
    padding: hp(4),
  },
  camButton: {
    height: '100%',
    width: '100%',
    borderRadius: hp(30),
    borderWidth: 2,
    borderColor: colors.secondaryPrimary,
  },
  snapText: {
    ...commonFontStyle(400, 18, colors.black),
    textAlign: 'center',
  },
  cartContainer: {
    paddingVertical: 35,
    paddingHorizontal: 30,
    alignItems: 'center',
    gap: 40,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cartIcon: {
    height: 54,
    width: 54,
  },
  cartCount: {
    position: 'relative',
    right: '10%',
    top: '-10%',
    ...commonFontStyle(400, 18, colors.white),
    lineHeight: 21.78,
  },
  cartAmount: {
    ...commonFontStyle(400, 28, colors.black),
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: '70%',
    justifyContent: 'center',
  },
  modalText: {
    ...commonFontStyle(600, hp(24), colors.black),
    lineHeight: 28.8,
  },
  productModalContainer: {
    justifyContent: 'flex-start',
  },
  discardText: {
    alignSelf: 'flex-end',
    ...commonFontStyle(400, hp(18), colors.secondaryPrimary),
    lineHeight: 21.6,
  },
  productImage: {
    height: 120,
    width: 120,
  },
  productName: {
    ...commonFontStyle(400, hp(18), colors.black),
    lineHeight: 21.6,
  },
  priceContainer: {
    paddingTop: 30,
    gap: 10,
    paddingBottom: 20,
  },
  priceText: {
    ...commonFontStyle(400, hp(42), colors.black),
    alignSelf: 'center',
  },
  quantityContainer: {
    backgroundColor: colors.green_E4,
    width: 122,
    height: 44,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  quantityText: {
    ...commonFontStyle(500, hp(30), colors.black),
  },
  quantityNumber: {
    ...commonFontStyle(500, hp(18), colors.black),
  },
  addButton: {
    marginHorizontal: wp(50),
    marginTop: heightPercentageToDP(2.5),
    width: 240,
  },
  scanBarcodeText: {
    ...commonFontStyle(500, 16, colors.secondaryPrimary),
    paddingTop: 20,
    textDecorationLine: 'underline',
    lineHeight: 21,
  },
});
