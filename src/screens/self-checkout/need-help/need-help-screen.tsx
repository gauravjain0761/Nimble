import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../theme/colors';
import {Header} from '../../../components/common';
import {Icons} from '../../../assets';
import {commonFontStyle, hp} from '../../../theme/fonts';
import {helpList} from '../../../utils/dummyData';
import HelpListView from './components/help-list-view';
import {navigationRef} from '../../../navigation/mainNavigator';

const NeedHelpScreen = () => {
  const renderItem = ({item}: any) => {
    return (
      <HelpListView title={item.title} dec={item.dec} image={item.image} />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        showRightIcon
        rightIcon={Icons.ic_close}
        onBackPressScreen={() => navigationRef.goBack()}
      />
      <View style={styles.scrollContainer}>
        <Text style={styles.helpText}>{'Need Help?'}</Text>
        <Text style={styles.descText}>
          {
            'If you are experiencing technical difficulties or other issues, we are here to help. Choose an option below for assistance.'
          }
        </Text>
        <View>
          <FlatList
            data={helpList}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
        <Text style={styles.descText}>
          {
            'We are here to ensure a smooth shopping experience every step of the way!'
          }
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default NeedHelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingHorizontal: hp(25),
  },

  helpText: {
    ...commonFontStyle(700, 28, colors.black),
    textAlign: 'left',
  },

  descText: {
    ...commonFontStyle(400, 14, colors.black),
    textAlign: 'left',
    marginTop: hp(10),
  },

  contentContainerStyle: {
    // flexGrow: 1,
    paddingBottom: hp(20),
    marginTop: hp(50),
  },
});
