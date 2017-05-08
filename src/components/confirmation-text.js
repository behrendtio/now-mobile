import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class ConfirmationText extends Component {
  static propTypes = {
    email: React.PropTypes.string.isRequired,
    securityCode: React.PropTypes.string.isRequired
  }

  render () {
    const { email, securityCode } = this.props

    return (
      <View style={styles.confirmationWrapper}>
        <Text style={styles.confirmationText}>
          We sent an email to <Text style={styles.boldText}>{email}</Text>.
        </Text>
        <Text style={styles.confirmationText}>
          Please check your emails, verify that the provided security code matches <Text style={styles.boldText}>{securityCode}</Text> and follow the link.
        </Text>
        <Text style={styles.confirmationText}>
          Waiting for your confirmation...
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  confirmationWrapper: {
    alignItems: 'center'
  },
  confirmationText: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20
  },
  boldText: {
    fontWeight: 'bold'
  }
})
