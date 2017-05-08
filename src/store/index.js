import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from '../reducers'

const logger = createLogger({
  level: 'info',
  collapsed: true
})

const configureStore = (onComplete) => {
  const store = createStore(
    reducers,
    undefined,
    compose(
      applyMiddleware(thunk, logger),
      autoRehydrate()
    )
  )

  persistStore(store, {
    storage: AsyncStorage,
    whitelist: ['persistent']
  }, onComplete)

  return store
}

export default configureStore
