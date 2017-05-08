const initialState = {
  aliases: [],
  refreshing: false,
  loading: true,
  removing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVING_ALIAS':
      return {...state, removing: action.value}
    case 'REFRESHING_ALIASES':
      return {...state, refreshing: action.value}
    case 'RECEIVED_ALIASES':
      return {...state, loading: false, refreshing: false, aliases: action.aliases}
    case 'DELETED_ALIAS':
      const aliases = state.aliases.filter(a => (
        action.id !== a.uid
      ))
      return {...state, removing: false, aliases}
    default:
      return state
  }
}
