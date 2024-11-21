import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../theme/colors'

const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Notification</Text>
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white
  }
})