import React from 'react'
import { CheckboxField } from "iq-blueberry"

const CheckWidget = ({ hasError, label, onChange, value, isRequired }) => {
  return (
    <CheckboxField
      isChecked={value}
      invalid={hasError}
      required={isRequired}
      label={label}
      onChange={onChange}
    />
  )
}

export default CheckWidget
