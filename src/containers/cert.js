import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Button, Card, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import moment from 'moment'

import * as CertActions from '../actions/certs'
import showActionSheet from '../lib/action-sheet'

class Cert extends Component {
  static propTypes = {
    cert: React.PropTypes.object.isRequired
  }

  _remove (id) {
    showActionSheet(async () => {
      await this.props.remove(id)
      this.props.navigator.pop()
    })
  }

  render () {
    const { cert, removing } = this.props
    const createdAt = moment(cert.created).fromNow()
    const expiresIn = moment().to(cert.expiration)

    return (
      <ScrollView>
        <Card title={cert.cn}>
          <Text style={styles.fact}>UID: {cert.uid}</Text>
          <Text style={styles.fact}>Auto Renew: {cert.autoRenew ? 'Yes' : 'No'}</Text>
          <Text style={styles.fact}>Expires: {expiresIn}</Text>
          <Text style={styles.fact}>Created: {createdAt}</Text>
        </Card>

        <Button
          disabled={removing}
          onPress={() => this._remove(cert.cn)}
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
      removing: state.certs.removing
    }
  },
  (dispatch) => {
    return {
      remove: (id) => {
        dispatch(CertActions.remove(id))
      }
    }
  }
)(Cert)
