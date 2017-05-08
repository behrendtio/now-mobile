import React, { Component } from 'react'
import { StyleSheet, RefreshControl, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import Empty from '../components/empty'
import Spinner from '../components/spinner'
import Alias from './alias'
import * as AliasActions from '../actions/aliases'

class Aliases extends Component {
  componentDidMount () {
    this.props.fetchAll()
  }

  _openAlias (alias) {
    this.props.navigator.push({
      component: Alias,
      passProps: { alias: alias }
    })
  }

  render () {
    const { loading, refresh, refreshing, aliases } = this.props

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
        {aliases.length > 0 ? aliases.map(alias => (
          <ListItem
            onPress={() => this._openAlias(alias)}
            key={alias.uid}
            title={alias.alias}
          />
        )) : <Empty type='aliases' />}
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
      refreshing: state.aliases.refreshing,
      loading: state.aliases.loading,
      aliases: state.aliases.aliases
    }
  },
  (dispatch) => {
    return {
      fetchAll: () => {
        dispatch(AliasActions.fetchAll())
      },
      refresh: () => {
        dispatch(AliasActions.refresh())
      }
    }
  }
)(Aliases)
