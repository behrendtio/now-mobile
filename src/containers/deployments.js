import React, { Component } from 'react'
import { StyleSheet, RefreshControl, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import Empty from '../components/empty'
import Spinner from '../components/spinner'
import Deployment from './deployment'
import * as DeploymentActions from '../actions/deployments'

class Deployments extends Component {
  componentDidMount () {
    this.props.fetchAll()
  }

  _openDeployment (deployment) {
    this.props.navigator.push({
      component: Deployment,
      passProps: { deployment: deployment }
    })
  }

  render () {
    const { loading, refresh, refreshing, deployments } = this.props

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
        {deployments.length > 0 ? deployments.map(deployment => (
          <ListItem
            onPress={() => this._openDeployment(deployment)}
            key={deployment.uid}
            title={deployment.url}
            subtitle={deployment.state}
          />
        )) : <Empty type='deployments' />}
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
      refreshing: state.deployments.refreshing,
      loading: state.deployments.loading,
      deployments: state.deployments.deployments
    }
  },
  (dispatch) => {
    return {
      fetchAll: () => {
        dispatch(DeploymentActions.fetchAll())
      },
      refresh: () => {
        dispatch(DeploymentActions.refresh())
      }
    }
  }
)(Deployments)
