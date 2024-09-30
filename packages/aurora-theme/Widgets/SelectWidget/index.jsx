import React from "react"
import { SelectField } from "@consumidor-positivo/aurora"
import FieldHolder from "../../wrappers/FieldHolder"

const SelectWidget = ({
  slug,
  options = [],
  value,
  placeholder,
  label,
  sublabel,
  isRequired,
  hasError,
  errorMessage,
  disabled = false,
  onChange,
}) => {
  return (
    <FieldHolder title={label}>
      <SelectField
        id={slug}
        options={options}
        value={value}
        placeholder={placeholder}
        label={sublabel}
        required={isRequired}
        error={hasError}
        errorMessage={errorMessage}
        disabled={disabled}
        onChange={onChange}
      />
    </FieldHolder>
  )
}

export default SelectWidget
