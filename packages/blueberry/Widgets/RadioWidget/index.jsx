import React from 'react'
import { RadioField } from "iq-blueberry"

const RadioWidget = ({
  hasError,
  errorMessage,
  label,
  onChange,
  value,
  isRequired,
  options,
}) => {
  return (
    <RadioField
      options={options}
      required={isRequired}
      value={value}
      label={label}
      invalid={hasError}
      errorMessage={errorMessage}
      onChange={onChange}
    />
  )
}

export default RadioWidget
