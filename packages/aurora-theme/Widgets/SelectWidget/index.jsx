import React from "react"
import { SelectField } from "@consumidor-positivo/aurora"

const SelectWidget = ({
  slug,
  options = [],
  value,
  placeholder,
  label,
  isRequired,
  hasError,
  errorMessage,
  disabled = false,
  onChange,
}) => {
  return (
    <SelectField
      id={slug}
      options={options}
      value={value}
      placeholder={placeholder}
      label={label}
      required={isRequired}
      error={hasError}
      errorMessage={errorMessage}
      disabled={disabled}
      onChange={onChange}
    />
  )
}

export default SelectWidget
