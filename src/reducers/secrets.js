const initialState = {
  secrets: [],
  refreshing: false,
  loading: true,
  removing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVING_SECRET':
      return {...state, removing: action.value}
    case 'REFRESHING_SECRETS':
      return {...state, refreshing: action.value}
    case 'RECEIVED_SECRETS':
      return {...state, loading: false, refreshing: false, secrets: action.secrets}
    case 'DELETED_SECRET':
      const secrets = state.secrets.filter(a => (
        action.id !== a.uid
      ))
      return {...state, removing: false, secrets}
    default:
      return state
  }
}
