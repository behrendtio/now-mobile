import { callApi } from '../lib/api'

export const fetchAll = () => {
  return async (dispatch) => {
    const res = await callApi('aliases')

    return dispatch({
      type: 'RECEIVED_ALIASES',
      aliases: res
    })
  }
}

export const remove = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVING_ALIAS',
      value: true
    })

    await callApi(`aliases/${id}`, {
      method: 'delete'
    })

    return dispatch({
      type: 'DELETED_ALIAS',
      id
    })
  }
}

export const refresh = () => {
  return (dispatch) => {
    dispatch({
      type: 'REFRESHING_ALIASES',
      value: true
    })

    return dispatch(fetchAll())
  }
}
