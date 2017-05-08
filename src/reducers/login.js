const initialState = {
  securityCode: null,
  confirming: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING_SECURITY_CODE':
      return {...state, confirming: true}
    case 'FETCHING_AUTH_TOKEN':
      return {...state, token: action.token}
    case 'RECEIVED_SECURITY_CODE':
      return {...state, securityCode: action.securityCode}
    default:
      return state
  }
}
