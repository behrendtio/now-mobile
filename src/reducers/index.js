import rootReducer from './root'

export default (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined
  }

  return rootReducer(state, action)
}
