export default function thowApiConnectionError(url) {
  throw new Error(`error on connect to Firebolt api - url ${url}`)
}
