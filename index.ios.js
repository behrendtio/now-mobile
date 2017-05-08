import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import Now from './src/containers/app'
import configureStore from './src/store'

class App extends Component {
  constructor () {
    super()

    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false}))
    }
  }

  render () {
    if (this.state.isLoading) {
      return null
    }

    return (
      <Provider store={this.state.store}>
        <Now />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Now', () => App)
