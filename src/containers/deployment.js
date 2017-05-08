import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Button, Card, Text } from 'react-native-elements'
import moment from 'moment'
import { connect } from 'react-redux'

import * as DeploymentActions from '../actions/aliases'
import showActionSheet from '../lib/action-sheet'

class Deployment extends Component {
  static propTypes = {
    deployment: React.PropTypes.object.isRequired
  }

  _remove (id) {
    showActionSheet(async () => {
      await this.props.remove(id)
      this.props.navigator.pop()
    })
  }

  render () {
    const { deployment, removing } = this.props
    const { uid, url, created, state, scale } = deployment
    const createdAt = moment.unix(created / 1000).fromNow()

    return (
      <ScrollView>
        <Card title={deployment.name}>
          <Text style={styles.fact}>UID: {uid}</Text>
          <Text style={styles.fact}>URL: {url}</Text>
          <Text style={styles.fact}>State: {state}</Text>
          <Text style={styles.fact}>Scale: {scale.current} / {scale.max}</Text>
          <Text style={styles.fact}>Created: {createdAt}</Text>
        </Card>
        <Button
          disabled={removing}
          onPress={() => this._remove(uid)}
          backgroundColor='#000000'
          buttonStyle={styles.button}
          title='REMOVE' />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  fact: {
    marginBottom: 10
  },
  button: {
    marginTop: 30
  }
})

export default connect(
  (state) => {
    return {
      removing: state.deployments.removing
    }
  },
  (dispatch) => {
    return {
      remove: (id) => {
        dispatch(DeploymentActions.remove(id))
      }
    }
  }
)(Deployment)
