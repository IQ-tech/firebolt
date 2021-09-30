import throwAPIConnectionError from "./throwAPIConnectionError"

export default function handleApiConnectionError(err = {}) {
  const errorResponse = err?.response
  const errorStatus = errorResponse.status
  const url = errorResponse?.config?.url

  if (errorStatus === 400) {
    return errorResponse?.data
  } else {
    return throwAPIConnectionError(url)
  }
}
