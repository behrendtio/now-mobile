import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Image, View } from 'react-native'
import { FormInput } from 'react-native-elements'

import * as LoginActions from '../actions/login'
import ConfirmationText from '../components/confirmation-text'

class Login extends Component {
  state = {
    email: null
  }

  render () {
    const { email } = this.state
    const { confirming, logIn, securityCode } = this.props

    return (
      <View style={styles.container}>
        {securityCode ? <ConfirmationText email={email} securityCode={securityCode} /> : <View>
          <View style={styles.logoWrapper}>
            <Image style={styles.logo} source={require('../images/icon.png')} />
          </View>
          <FormInput
            editable={!confirming}
            placeholder='you@youremail.com'
            inputStyle={styles.email}
            autoCapitalize='none'
            keyboardType='email-address'
            onSubmitEditing={() => logIn(email)}
            onChangeText={(email) => this.setState({email})} />
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  logo: {
    width: 90,
    height: 90
  },
  email: {
    width: 300,
    textAlign: 'center'
  },
  logoWrapper: {
    marginBottom: 50,
    alignItems: 'center'
  }
})

export default connect(
  (state) => {
    return {
      securityCode: state.login.securityCode,
      confirming: state.login.confirming
    }
  },
  (dispatch) => {
    return {
      logIn: (email) => {
        dispatch(LoginActions.logIn(email))
      }
    }
  }
)(Login)
