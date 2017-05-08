import React, { Component } from 'react'
import { StyleSheet, NavigatorIOS } from 'react-native'
import { Tabs, Tab, Icon } from 'react-native-elements'
import { connect } from 'react-redux'

import Deployments from './deployments'
import Aliases from './aliases'
import Certs from './certs'
import Domains from './domains'
import Secrets from './secrets'
import Login from './login'
import * as PersistentActions from '../actions/persistent'

const tabs = [
  { key: 'Deployments', icon: 'cloud-upload', component: Deployments },
  { key: 'Domains', icon: 'domain', component: Domains },
  { key: 'Certs', icon: 'vpn-key', component: Certs },
  { key: 'Aliases', icon: 'forward', component: Aliases },
  { key: 'Secrets', icon: 'security', component: Secrets }
]

class Now extends Component {
  render () {
    const { token, changeTab, selectedTab } = this.props

    if (!token) {
      return <Login />
    }

    return (
      <Tabs>
        {tabs.map((tab, index) => {
          return <Tab
            key={tab.key}
            selected={selectedTab === index}
            title={tab.key}
            selectedTitleStyle={styles.selectedTitle}
            renderIcon={() => <Icon color={'#9b9b9b'} name={tab.icon} size={30} />}
            renderSelectedIcon={() => <Icon color={'#000000'} name={tab.icon} size={30} />}
            onPress={() => changeTab(index)}>
            <NavigatorIOS
              tintColor='#000000'
              initialRoute={{component: tab.component, title: tab.key}}
              style={styles.navigator}
            />
          </Tab>
        })}
      </Tabs>
    )
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  },
  selectedTitle: {
    color: '#000000'
  }
})

export default connect(
  (state) => {
    return {
      token: state.persistent.token,
      selectedTab: state.persistent.selectedTab
    }
  },
  (dispatch) => {
    return {
      changeTab: (index) => {
        dispatch(PersistentActions.changeTab(index))
      }
    }
  }
)(Now)
