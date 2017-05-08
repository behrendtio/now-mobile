import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Button, Card, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import moment from 'moment'

import * as SecretActions from '../actions/secrets'
import showActionSheet from '../lib/action-sheet'

class Secret extends Component {
  static propTypes = {
    secret: React.PropTypes.object.isRequired
  }

  _remove (id) {
    showActionSheet(async () => {
      await this.props.remove(id)
      this.props.navigator.pop()
    })
  }

  render () {
    const { secret, removing } = this.props
    const createdAt = moment(secret.created).fromNow()

    return (
      <ScrollView>
        <Card title={secret.name}>
          <Text style={styles.fact}>UID: {secret.uid}</Text>
          <Text style={styles.fact}>Created: {createdAt}</Text>
        </Card>

        <Button
          disabled={removing}
          onPress={() => this._remove(secret.uid)}
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
      removing: state.secrets.removing
    }
  },
  (dispatch) => {
    return {
      remove: (id) => {
        dispatch(SecretActions.remove(id))
      }
    }
  }
)(Secret)
