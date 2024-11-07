import React from "react"
import { Checkbox } from "@consumidor-positivo/aurora"

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
  onBlur,
}) => {
  return (
    <Checkbox.Field
      id={id}
      name={name}
      value={value}
      required={isRequired}
      defaultChecked={checked}
      label={label}
      error={hasError}
      errorMessage={errorMessage}
      disabled={disabled}
      onBlur={(e) => onBlur(e.target.checked)}
      onChange={(e) => onChange(e.target.checked)}
    />
  )
}

export default CheckboxWidget
