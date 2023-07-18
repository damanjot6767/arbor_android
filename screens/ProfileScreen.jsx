import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile from '../component/profile'

export default function DetailScreen() {
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
        <Profile/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaStyle:{
    flex:1,
    width:'100%',
    height:'100%'
  }
})