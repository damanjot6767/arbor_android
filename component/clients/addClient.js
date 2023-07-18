import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AddClient() {
  return (
    <View style={styles.conatiner}>
      <Text>AddClient</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    conatiner: {
        flex:1,
        width: '100%',
        height: '100%',
        padding:12
      },
})