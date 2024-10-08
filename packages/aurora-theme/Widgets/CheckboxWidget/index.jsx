import React from "react"
import { CheckboxField } from "@consumidor-positivo/aurora"

const CheckboxWidget = ({
  id,
  name,
  value,
  isRequired,
  checked = false,
  label,
  hasError,
  errorMessage,
  disabled = false,
  onChange,
}) => {
  return (
    <CheckboxField
      id={id}
      name={name}
      value={value}
      required={isRequired}
      defaultChecked={checked}
      label={label}
      error={hasError}
      errorMessage={errorMessage}
      disabled={disabled}
      onChange={onChange}
    />
  )
}

export default CheckboxWidget
