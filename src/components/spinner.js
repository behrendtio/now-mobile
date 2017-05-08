import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export default () => {
  return (
    <View style={styles.centering}>
      <ActivityIndicator animating />
    </View>
  )
}

const styles = StyleSheet.create({
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})
