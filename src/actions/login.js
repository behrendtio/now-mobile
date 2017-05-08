import { callApi } from '../lib/api'

export const logIn = (email) => {
  return async (dispatch) => {
    dispatch({type: 'FETCHING_SECURITY_CODE'})

    const res = await callApi('registration', {
      method: 'post',
      body: JSON.stringify({email, tokenname: 'mobile'})
    })

    dispatch({
      type: 'RECEIVED_SECURITY_CODE',
      securityCode: res.securityCode
    })

    return dispatch(verify(email, res.token))
  }
}

const verify = (email, token) => {
  return async (dispatch) => {
    const t = Math.floor(Date.now() / 1000)
    const path = `registration/verify?email=${email}&token=${token}&t=${t}`

    const interval = setInterval(async () => {
      try {
        const confirmation = await callApi(path)

        clearInterval(interval)

        return dispatch({
          type: 'RECEIVED_AUTH_TOKEN',
          token: confirmation.token
        })
      } catch (err) {
        // Waiting for confirmation...
      }
    }, 1000)
  }
}
