import React, { Component } from 'react'
import { StyleSheet, RefreshControl, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import Empty from '../components/empty'
import Spinner from '../components/spinner'
import Domain from './domain'
import * as DomainActions from '../actions/domains'

class Domains extends Component {
  componentDidMount () {
    this.props.fetchAll()
  }

  _openDomain (domain) {
    this.props.navigator.push({
      component: Domain,
      passProps: { domain: domain }
    })
  }

  render () {
    const { loading, refresh, refreshing, domains } = this.props

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
        {domains.length > 0 ? domains.map(domain => (
          <ListItem
            onPress={() => this._openDomain(domain)}
            key={domain.uid}
            title={domain.name}
          />
        )) : <Empty type='domains' />}
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
      refreshing: state.domains.refreshing,
      loading: state.domains.loading,
      domains: state.domains.domains
    }
  },
  (dispatch) => {
    return {
      fetchAll: () => {
        dispatch(DomainActions.fetchAll())
      },
      refresh: () => {
        dispatch(DomainActions.refresh())
      }
    }
  }
)(Domains)
