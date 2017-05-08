import { callApi } from '../lib/api'

export const fetchAll = () => {
  return async (dispatch) => {
    const res = await callApi('domains')

    return dispatch({
      type: 'RECEIVED_DOMAINS',
      domains: res
    })
  }
}

export const remove = (name) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVING_DOMAIN',
      value: true
    })

    await callApi(`domains/${name}`, {
      method: 'delete'
    })

    return dispatch({
      type: 'DELETED_DOMAIN',
      name
    })
  }
}

export const refresh = () => {
  return (dispatch) => {
    dispatch({
      type: 'REFRESHING_DOMAINS',
      value: true
    })

    return dispatch(fetchAll())
  }
}
