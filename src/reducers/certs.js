const initialState = {
  certs: [],
  refreshing: false,
  loading: true,
  removing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVING_CERT':
      return {...state, removing: action.value}
    case 'REFRESHING_CERTS':
      return {...state, refreshing: action.value}
    case 'RECEIVED_CERTS':
      return {...state, loading: false, refreshing: false, certs: action.certs}
    case 'DELETED_CERT':
      const certs = state.certs.filter(a => (
        action.id !== a.uid
      ))
      return {...state, removing: false, certs}
    default:
      return state
  }
}
