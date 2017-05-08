import React, { Component } from 'react'
import { StyleSheet, RefreshControl, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import Empty from '../components/empty'
import Spinner from '../components/spinner'
import Secret from './secret'
import * as SecretActions from '../actions/secrets'

class Secrets extends Component {
  componentDidMount () {
    this.props.fetchAll()
  }

  _openSecret (secret) {
    this.props.navigator.push({
      component: Secret,
      passProps: { secret: secret }
    })
  }

  render () {
    const { loading, refresh, refreshing, secrets } = this.props

    if (loading) {
      return <Spinner />
    }

    return (
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            title='Loading...'
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
      >
        {secrets.length > 0 ? secrets.map(secret => (
          <ListItem
            onPress={() => this._openSecret(secret)}
            key={secret.uid}
            title={secret.name}
          />
        )) : <Empty type='secrets' />}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 64,
    marginBottom: 50
  }
})

export default connect(
  (state) => {
    return {
      refreshing: state.secrets.refreshing,
      loading: state.secrets.loading,
      secrets: state.secrets.secrets
    }
  },
  (dispatch) => {
    return {
      fetchAll: () => {
        dispatch(SecretActions.fetchAll())
      },
      refresh: () => {
        dispatch(SecretActions.refresh())
      }
    }
  }
)(Secrets)
