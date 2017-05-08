import { combineReducers } from 'redux'

import persistent from './persistent'
import login from './login'
import deployments from './deployments'
import domains from './domains'
import certs from './certs'
import aliases from './aliases'
import secrets from './secrets'

export default combineReducers({
  persistent,
  login,
  deployments,
  domains,
  certs,
  aliases,
  secrets
})
