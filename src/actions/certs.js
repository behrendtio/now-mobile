import { callApi } from '../lib/api'

export const fetchAll = () => {
  return async (dispatch) => {
    const res = await callApi('certs')

    return dispatch({
      type: 'RECEIVED_CERTS',
      certs: res
    })
  }
}

export const remove = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVING_CERT',
      value: true
    })

    await callApi(`certs/${id}`, {
      method: 'delete'
    })

    return dispatch({
      type: 'DELETED_CERT',
      id
    })
  }
}

export const refresh = () => {
  return (dispatch) => {
    dispatch({
      type: 'REFRESHING_CERTS',
      value: true
    })

    return dispatch(fetchAll())
  }
}
