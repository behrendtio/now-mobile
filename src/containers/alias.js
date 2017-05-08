import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Button, Card, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import moment from 'moment'

import * as AliasActions from '../actions/aliases'
import showActionSheet from '../lib/action-sheet'

class Alias extends Component {
  static propTypes = {
    alias: React.PropTypes.object.isRequired
  }

  _remove (id) {
    showActionSheet(async () => {
      await this.props.remove(id)
      this.props.navigator.pop()
    })
  }

  render () {
    const { alias, removing } = this.props
    const createdAt = moment(alias.created).fromNow()

    return (
      <ScrollView>
        <Card title={alias.alias}>
          <Text style={styles.fact}>UID: {alias.uid}</Text>
          <Text style={styles.fact}>Deployment ID: {alias.deploymentId}</Text>
          <Text style={styles.fact}>Created: {createdAt}</Text>
        </Card>

        <Button
          disabled={removing}
          onPress={() => this._remove(alias.uid)}
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
      removing: state.aliases.removing
    }
  },
  (dispatch) => {
    return {
      remove: (id) => {
        dispatch(AliasActions.remove(id))
      }
    }
  }
)(Alias)
