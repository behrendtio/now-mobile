import { callApi } from '../lib/api'

export const fetchAll = () => {
  return async (dispatch) => {
    const res = await callApi('secrets')

    return dispatch({
      type: 'RECEIVED_SECRETS',
      secrets: res
    })
  }
}

export const remove = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVING_SECRET',
      value: true
    })

    await callApi(`secrets/${id}`, {
      method: 'delete'
    })

    return dispatch({
      type: 'DELETED_SECRET',
      id
    })
  }
}

export const refresh = () => {
  return (dispatch) => {
    dispatch({
      type: 'REFRESHING_SECRETS',
      value: true
    })

    return dispatch(fetchAll())
  }
}
