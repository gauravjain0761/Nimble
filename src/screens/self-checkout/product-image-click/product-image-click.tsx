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
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {
  commonFontStyle,
  hp,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  wp,
} from '../../../theme/fonts';
import {Header, PrimaryButton} from '../../../components/common';
import HeaderExit from '../../../components/common/HeaderExit';
import {Icons} from '../../../assets';
import Slider from '../../../components/common/Slider';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {navigationRef} from '../../../navigation/mainNavigator';
import {screenName} from '../../../navigation/screenNames';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useAppSelector} from '../../../redux/hooks';
import RNFetchBlob from 'rn-fetch-blob';
import HapticFeedback from 'react-native-haptic-feedback';
import {errorToast} from '../../../utils/commonFunction';
import {products} from '../../../utils/dummyData';

const ImageClickScreen = ({}) => {
  const camera = useRef<Camera>(null);

  const device = useCameraDevice('back');
  const isFocused = useIsFocused();

  const [showCamera, setShowCamera] = useState(true);
  const [noMatchingProduct, setNoMatchingProduct] = useState(true);
  const [imageSource, setImageSource] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(4.5); // Initial price per unit
  const [cartCount, setCartCount] = useState(0); // Cart item count
  const [cartAmount, setCartAmount] = useState(0); // Total cart amount
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null); // Track captured image
  const [matchedProductData, setMatchedProductData] = useState([]);
  const [extractedTexts, setExtractedTexts] = useState('');
  const productsData = useAppSelector(state => state?.product?.data || []);
  const currentSelectedBrand = useAppSelector(
    state => state?.productCategory?.currentProductBrand,
  );
  // const products = useAppSelector(state => state);
  const [wrongBrandProductFlag, setWrongBrandProductFlag] = useState(false);
  const [notMatchedFlag, setnotMatchedFlag] = useState(false);

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

  const capturePhoto = async () => {
    try {
      if (camera.current) {
        const photo = await camera.current.takePhoto();
        console.log('Photo captured:', photo);

        setCapturedImage(photo.path); // Save the photo path
        // setShowCamera(false); // Hide the camera after capturing the photo
        setIsModalVisible(true);
        setNoMatchingProduct(false);
        sendToAzure();
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const extractContentFromResponse = ocrResponse => {
    const regions = ocrResponse?.regions || [];
    const extractedTexts = [];

    regions.forEach(region => {
      region.lines.forEach(line => {
        line.words.forEach(word => {
          extractedTexts.push(word.text);
        });
      });
    });

    return extractedTexts.join(' ');
  };

  const sendToAzure = async () => {
    try {
      setIsProduct(false);
      console.log('Send to Azure function called');
      setCartAmount(0);
      setCartCount(0);
      const endpoint =
        'https://cvnimble1.cognitiveservices.azure.com/vision/v3.1/ocr';
      const apiKey = '3e368072d8914578ac47345b074dfb7a';

      const file = {
        uri: capturedImage,
        type: 'image/jpeg',
        name: 'image.jpg',
      };

      // Use RNFetchBlob for file upload
      const response = await RNFetchBlob.fetch(
        'POST',
        endpoint,
        {
          'Content-Type': 'multipart/form-data',
          'Ocp-Apim-Subscription-Key': apiKey,
        },
        [{name: 'file', filename: file.name, data: RNFetchBlob.wrap(file.uri)}],
      );

      if (response.info().status === 200) {
        const data = JSON.parse(response.data);
        console.log('Response from Azure API:', data);

        const contents = extractContentFromResponse(data);
        setExtractedTexts(contents);

        // Filter out empty or invalid words
        const imgTextWords = contents
          .split(' ')
          .map(word => word.trim().toLowerCase())
          .filter(word => word.length > 1 && /^[a-z0-9]+$/i.test(word));

        console.log('====================================');
        console.log(imgTextWords); // Check the extracted words
        console.log('====================================');

        if (imgTextWords.length > 0) {
          const productsWithScores = products[2]?.productImages.map(prd => {
            const prdName = prd?.name?.toLowerCase() || '';
            const prdTags = prd?.tags || [];

            let nameMatch = false; // Boolean for name match
            let tagMatches = 0; // Count for tag matches

            // Iterate through the extracted words from the image
            imgTextWords.forEach(word => {
              const cleanedWord = word.trim().toLowerCase();

              // Skip words that are too short or not alphanumeric
              if (
                cleanedWord.length <= 1 ||
                !/^[a-z0-9]+$/i.test(cleanedWord)
              ) {
                return;
              }

              // Check for matches in product name (set `nameMatch` to true if found)
              if (prdName.includes(cleanedWord)) {
                nameMatch = true;
              }

              // Check for matches in product tags (only if nameMatch is false)
              if (!nameMatch) {
                prdTags.forEach(tag => {
                  if (tag.toLowerCase().includes(cleanedWord)) {
                    tagMatches++; // Increment tag match count
                  }
                });
              }
            });

            // If nameMatch is true, assign a high score and ignore tag matches
            const totalMatches = nameMatch;
            // ? Infinity : tagMatches;

            return {...prd, matchScore: totalMatches}; // Add match score to product object
          });

          // Find the product with the highest score
          const bestMatchProduct = productsWithScores?.reduce(
            (bestMatch, current) =>
              current.matchScore > (bestMatch?.matchScore || 0)
                ? current
                : bestMatch,
            null,
          );

          if (bestMatchProduct && bestMatchProduct.matchScore > 0) {
            setMatchedProductData(bestMatchProduct);
            console.log('Matching products found:', bestMatchProduct);
            HapticFeedback.trigger('selection');
            setCapturedImage(null);
            setExtractedTexts('');
            setIsProduct(true);
          } else {
            console.log('No matching products found.');
            setNoMatchingProduct(true);
            setIsProduct(false);
            setMatchedProductData([]);
            setShowCamera(true);
          }
        } else {
          console.log('No valid words extracted.');
          setNoMatchingProduct(true);
          setIsProduct(false);
          setMatchedProductData([]);
          setShowCamera(true);

          errorToast('Please take a clear image of the product');
        }
      } else {
        console.log(`Azure API error: ${response.info().status}`);
        setShowCamera(true);
        errorToast('An error occurred. Please try again.');
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);

      const errorMessage = error.toString();
      setShowCamera(true);

      if (errorMessage.includes('startsWith')) {
        errorToast('Please take a clear image of the product');
      } else {
        errorToast(`An unexpected error occurred: ${errorMessage}`);
      }

      setIsModalVisible(false);
    }
  };

  // Dispatch the action to add the new order
  useEffect(() => {
    async function getPermissions() {
      try {
        const cameraStatus = await Camera.getCameraPermissionStatus();
        const micStatus = await Camera.getMicrophonePermissionStatus();

        if (cameraStatus !== 'authorized') {
          const cameraPermission = await Camera.requestCameraPermission();
          console.log('Camera Permission:', cameraPermission);
        }

        if (micStatus !== 'authorized') {
          const micPermission = await Camera.requestMicrophonePermission();
          console.log('Microphone Permission:', micPermission);
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    }

    getPermissions();
  }, []);

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToOrder = () => {
    // Update the cart count and amount
    setCartCount(prevCount => prevCount + quantity);
    setCartAmount(
      prevAmount => prevAmount + matchedProductData?.price * quantity,
    );
    setIsModalVisible(false);
  };

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  useFocusEffect(
    React.useCallback(() => {
      setCartAmount(0);
      setCartCount(0);
      setQuantity(1);
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderExit showLeftIcon showRightIcon showLogo />
      <View style={styles.cameraContainer}>
        {showCamera ? (
          <>
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              photo={true}
            />

            <View style={styles.cameraButton}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={capturePhoto}>
                <View style={styles.camButton} />
              </TouchableOpacity>
              <Text style={styles.snapText}>
                {'Snap a photo of the product'}
              </Text>
            </View>
          </>
        ) : (
          imageSource !== '' && (
            <Image
              style={styles.image}
              source={{
                uri: `file://${imageSource}`,
              }}
            />
          )
        )}
      </View>
      <View style={styles.cartContainer}>
        <View style={styles.cartInfo}>
          <Image source={Icons.cart} style={styles.cartIcon} />
          <Text style={styles.cartCount}>{cartCount}</Text>
          <Text style={styles.cartAmount}>${cartAmount.toFixed(2)}</Text>
        </View>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide">
          <View style={styles.modalContainer}>
            {/* Loading State */}
            {!isProduct && !noMatchingProduct && (
              <>
                <ActivityIndicator
                  size={'large'}
                  color={colors.secondaryPrimary}
                />
                <TouchableOpacity>
                  <Text style={styles.modalText}>Recognizing your item</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Product Not Found State */}
            {isProduct == false && noMatchingProduct == true && (
              <>
                <Text
                  onPress={() => {
                    setIsModalVisible(false);
                    setMatchedProductData([]);
                    setShowCamera(true);
                  }}
                  style={[styles.discardText, {top: -130}]}>
                  Discard
                </Text>
                <TouchableOpacity>
                  <Text style={styles.modalText}>
                    Product not found, please try once more.
                  </Text>
                </TouchableOpacity>
                <Text
                  style={styles.scanBarcodeText}
                  onPress={() =>
                    navigationRef.navigate(screenName.BardcodeScanner)
                  }>
                  Product Not Found? Scan barcode instead.
                </Text>
              </>
            )}

            {/* Product Found State */}
            {isProduct && matchedProductData && (
              <View style={styles.productModalContainer}>
                <Text
                  onPress={() => {
                    setIsModalVisible(false);
                    setMatchedProductData([]);
                    setShowCamera(true);
                  }}
                  style={styles.discardText}>
                  Discard
                </Text>
                <Image
                  source={matchedProductData?.image}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>
                  {matchedProductData?.name}
                </Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>
                    $
                    {(parseFloat(matchedProductData?.price) * quantity).toFixed(
                      2,
                    )}
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
                <Text
                  style={styles.scanBarcodeText}
                  onPress={() =>
                    navigationRef.navigate(screenName.BardcodeScanner)
                  }>
                  Wrong Item? Scan barcode instead.
                </Text>
              </View>
            )}
          </View>
        </Modal>
      </View>
      <View>
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
    </SafeAreaView>
  );
};

export default ImageClickScreen;

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
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
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
    alignSelf: 'center',
  },
  productModalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  discardText: {
    alignSelf: 'flex-end',
    ...commonFontStyle(400, hp(18), colors.secondaryPrimary),
    lineHeight: 21.6,
  },
  productImage: {
    height: 120,
    width: 120,
    alignSelf: 'center',
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
    alignSelf: 'center',
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
    alignSelf: 'center',
  },
});
