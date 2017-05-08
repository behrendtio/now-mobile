const initialState = {
  deployments: [],
  refreshing: false,
  loading: true,
  removing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVING_DEPLOYMENT':
      return {...state, removing: action.value}
    case 'REFRESHING_DEPLOYMENTS':
      return {...state, refreshing: action.value}
    case 'RECEIVED_DEPLOYMENTS':
      return {...state, loading: false, refreshing: false, deployments: action.deployments}
    case 'DELETED_DEPLOYMENT':
      const deployments = state.deployments.filter(d => (
        action.id !== d.uid
      ))
      return {...state, removing: false, deployments}
    default:
      return state
  }
}
