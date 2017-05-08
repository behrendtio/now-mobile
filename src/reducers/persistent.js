const initialState = {
  selectedTab: 0,
  token: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVED_AUTH_TOKEN':
      return {...state, token: action.token}
    case 'CHANGE_TAB':
      return {...state, selectedTab: action.index}
    default:
      return state
  }
}
