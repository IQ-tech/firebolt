import React from 'react'
import useCEPWidget from "../../hooks/useCEPWidget"
import TextWidget from "../TextWidget"


const CEPWidget = ({
  relatedFieldsSlugs,
  modifyPayloadKeys,
  stateFormat,
  value,
  manuallySetFieldError,
  clearManuallySetError,
  payload,
  ...props
}) => {
  useCEPWidget({
    relatedFieldsSlugs,
    modifyPayloadKeys,
    stateFormat,
    value,
    manuallySetFieldError,
    clearManuallySetError,
    payload
  })
  return <TextWidget {...props} value={value} payload={payload} />
}

export default CEPWidget