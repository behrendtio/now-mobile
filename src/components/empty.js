import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Empty extends Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired
  }

  render () {
    const { type } = this.props

    return (
      <View style={styles.container}>
        <Text>No {type} yet</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 50
  }
})
