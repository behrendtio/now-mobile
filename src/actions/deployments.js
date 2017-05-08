import { callApi } from '../lib/api'

export const fetchAll = () => {
  return async (dispatch) => {
    const res = await callApi('deployments')

    return dispatch({
      type: 'RECEIVED_DEPLOYMENTS',
      deployments: res
    })
  }
}

export const remove = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVING_DEPLOYMENT',
      value: true
    })

    await callApi(`deployments/${id}`, {
      method: 'delete'
    })

    return dispatch({
      type: 'DELETED_DEPLOYMENT',
      id
    })
  }
}

export const refresh = () => {
  return (dispatch) => {
    dispatch({
      type: 'REFRESHING_DEPLOYMENTS',
      value: true
    })

    return dispatch(fetchAll())
  }
}
