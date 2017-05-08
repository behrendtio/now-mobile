import React, { Component } from 'react'
import { AppRegistry, Text, View } from 'react-native'

export default class Now extends Component {
  render () {
    return (
      <View>
        <Text>Todo</Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('Now', () => Now)
