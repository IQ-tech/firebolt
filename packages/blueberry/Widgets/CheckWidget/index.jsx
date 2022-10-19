import React from "react"
import { CheckboxField } from "iq-blueberry"

const CheckWidget = ({
  hasError,
  label,
  onChange,
  value,
  isRequired,
  onBlur,
}) => {
  return (
    <CheckboxField
      isChecked={value}
      invalid={hasError}
      required={isRequired}
      label={label}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

export default CheckWidget
