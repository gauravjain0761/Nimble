import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {Header, PrimaryButton} from '../../../components/common';
import {colors} from '../../../theme/colors';
import {Icons} from '../../../assets';
import {hp, wp} from '../../../theme/fonts';
import CustomInput from '../../../components/custom-input/custom-input';
import ImagePickerModal from '../../../components/modal/ImagePickerModal';

const EditProfile: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    url: null,
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Edit Profile'} showLeftIcon />
      <ScrollView
        style={{...styles.mainContainer}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileView}>
          {selectedImage?.url ? (
            <Image
              source={{uri: selectedImage.url}}
              style={styles.userProfile}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={Icons.account}
              style={styles.user}
              resizeMode="contain"
              tintColor={colors.secondaryPrimary}
            />
          )}

          <TouchableOpacity
            style={styles.cameraStyle}
            onPress={() => setIsVisible(true)}>
            <Image
              source={Icons.camera}
              style={styles.camera}
              tintColor={colors.white}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <CustomInput
          label="Name"
          placeholder={'Enter Name'}
          keyboardType={'default'}
          value={name}
          onChangeText={setName}
        />
        <CustomInput
          label={'Email'}
          placeholder={'Enter Email'}
          keyboardType={'email-address'}
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          label={'Phone'}
          placeholder={'Enter Phone'}
          keyboardType={'number-pad'}
          value={phone}
          onChangeText={setPhone}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <PrimaryButton type="fill" title={'Save Changes'} onPress={() => {}} />
      </View>

      <ImagePickerModal
        isVisible={isVisible}
        onVisibleChange={setIsVisible}
        onFilePathSelect={setSelectedImage}
      />
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    marginHorizontal: wp(16),
  },
  profileView: {
    width: hp(70),
    height: hp(70),
    borderRadius: 70,
    backgroundColor: colors.grey_10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp(20),
  },
  user: {
    width: hp(28),
    height: hp(28),
  },
  userProfile: {
    height: '100%',
    width: '100%',
    borderRadius: 60,
  },
  cameraStyle: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: colors.secondaryPrimary,
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '60%',
    height: '60%',
  },
  buttonContainer: {
    marginHorizontal: hp(16),
    paddingBottom: hp(30),
  },
});
