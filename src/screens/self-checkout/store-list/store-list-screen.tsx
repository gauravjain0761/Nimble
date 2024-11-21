import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../theme/colors';
import {Header, PrimaryButton} from '../../../components/common';
import {commonFontStyle, hp, SCREEN_WIDTH} from '../../../theme/fonts';
import StoreListView from './components/store-list-view';
import {screenName} from '../../../navigation/screenNames';

const StoreListScreen = ({navigation, route}: any) => {
  const {type} = route?.params || {};

  const onPressNo = () => {
    navigation.navigate(screenName.SearchStoreScreen);
  };
  const onPressYes = () => {
    navigation.navigate(screenName.LoadingScreen, {
      headerText: 'Connecting to\nStarbank Convenience #35',
      decText: 'Setting up your mobile checkout…',
      type: 'start_checkout',
    });
  };

  const renderItem = ({}: any) => {
    return <StoreListView />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header showLogo showLeftIcon />
      <View style={styles.container}>
        <Text style={styles.headingText}>
          {'Are you currently \nat this store?'}
        </Text>

        <FlatList
          data={[1]}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
      <View style={styles.btnStyle}>
        <PrimaryButton
          title={'Yes, I am here'}
          type="fill"
          onPress={() => {
            onPressYes();
          }}
        />
        <PrimaryButton
          title={
            type === 'store' ? 'No, search again' : 'No, I am at another store'
          }
          type="outline"
          onPress={() => {
            if (type === 'store') {
            } else {
              onPressNo();
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default StoreListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headingText: {
    ...commonFontStyle(700, 24, colors.secondaryPrimary),
    textAlign: 'center',
  },
  btnStyle: {
    marginHorizontal: hp(50),
    gap: hp(20),
    marginBottom: hp(30),
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: hp(20),
    width: SCREEN_WIDTH / 1.5,
    alignSelf: 'center',
    gap: hp(20),
  },
});
