const initialState = {
  domains: [],
  refreshing: false,
  loading: true,
  removing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVING_DOMAIN':
      return {...state, removing: action.value}
    case 'REFRESHING_DOMAINS':
      return {...state, refreshing: action.value}
    case 'RECEIVED_DOMAINS':
      return {...state, loading: false, refreshing: false, domains: action.domains}
    case 'DELETED_DOMAIN':
      const domains = state.domains.filter(a => (
        action.name !== a.name
      ))
      return {...state, removing: false, domains}
    default:
      return state
  }
}
