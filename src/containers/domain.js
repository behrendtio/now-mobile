import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Button, Card, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import moment from 'moment'

import * as DomainActions from '../actions/domains'
import showActionSheet from '../lib/action-sheet'

class Domain extends Component {
  static propTypes = {
    domain: React.PropTypes.object.isRequired
  }

  _remove (id) {
    showActionSheet(async () => {
      await this.props.remove(id)
      this.props.navigator.pop()
    })
  }

  render () {
    const { domain, removing } = this.props
    const createdAt = moment(domain.created).fromNow()

    return (
      <ScrollView>
        <Card title={domain.name}>
          <Text style={styles.fact}>UID: {domain.uid}</Text>
          <Text style={styles.fact}>External: {domain.isExternal ? 'Yes' : 'No'}</Text>
          <Text style={styles.fact}>Created: {createdAt}</Text>
          <Text>Aliases</Text>
          {domain.aliases.map(a => (
            <Text key={a}>- {a}</Text>
          ))}
        </Card>

        <Button
          disabled={removing}
          onPress={() => this._remove(domain.name)}
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
      removing: state.domains.removing
    }
  },
  (dispatch) => {
    return {
      remove: (id) => {
        dispatch(DomainActions.remove(id))
      }
    }
  }
)(Domain)
