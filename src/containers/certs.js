import React, { Component } from 'react'
import { StyleSheet, RefreshControl, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import Empty from '../components/empty'
import Spinner from '../components/spinner'
import Cert from './cert'
import * as CertActions from '../actions/certs'

class Certs extends Component {
  componentDidMount () {
    this.props.fetchAll()
  }

  _openCert (cert) {
    this.props.navigator.push({
      component: Cert,
      passProps: { cert: cert }
    })
  }

  render () {
    const { loading, refresh, refreshing, certs } = this.props

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
        {certs.length > 0 ? certs.map(cert => (
          <ListItem
            onPress={() => this._openCert(cert)}
            key={cert.uid}
            title={cert.cn}
          />
        )) : <Empty type='certs' />}
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
      refreshing: state.certs.refreshing,
      loading: state.certs.loading,
      certs: state.certs.certs
    }
  },
  (dispatch) => {
    return {
      fetchAll: () => {
        dispatch(CertActions.fetchAll())
      },
      refresh: () => {
        dispatch(CertActions.refresh())
      }
    }
  }
)(Certs)
