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
  ...props
}) => {
  useCEPWidget({
    relatedFieldsSlugs,
    modifyPayloadKeys,
    stateFormat,
    value,
    manuallySetFieldError,
    clearManuallySetError,
  })
  return <TextWidget {...props} value={value} />
}

export default CEPWidget
