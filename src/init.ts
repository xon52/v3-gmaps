import insert from './insert'
import error from './error'
import { onSuccess, onFail } from './api'

// URL parameters for Google Maps
// https://developers.google.com/maps/documentation/javascript/url-params
export type apiOptionsType = {
  key: string
  libraries?: string[]
  v?: string
  language?: string
  region?: string
}

// Google Maps API options
const _params = ''
// Google Maps API options generator
const genParams = ({ key, libraries, v, language, region }: apiOptionsType) => {
  if (!key) throw error.KEY_MISSING()
  let params = `key=${key}`
  if (libraries) params = `${params}&libraries=${libraries.join(',')}`
  if (v) params = `${params}&v=${v}`
  if (language) params = `${params}&language=${language}`
  if (region) params = `${params}&region=${region}`
  return params
}

// Initialise plugin install
const init = (options: apiOptionsType): void => {
  // URL params
  const params = genParams(options)
  // If the params has changed, it will need to be updated
  const requireUpdate = _params !== params
  // Update Google script if required
  if (requireUpdate)
    insert(params)
      .then(() => onSuccess())
      .catch((err) => onFail(err))
}

export default init
