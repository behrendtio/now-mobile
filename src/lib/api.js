import { AsyncStorage } from 'react-native'

const BASE_URL = 'https://api.zeit.co/now'

export const callApi = async (endpoint, params = {}) => {
  const token = await AsyncStorage.getItem('token')

  const options = {
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  }

  let res = await fetch(`${BASE_URL}/${endpoint}`, {...options, ...params})

  if (res.status === 403 || res.status === 403) {
    throw new Error('HTTP request error')
  }

  let body = await res.json()

  if (body.error) {
    throw body.error.message
  }

  if (body.token) {
    return body
  }

  return body[endpoint]
}
