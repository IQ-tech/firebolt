import React from "react"
import { SelectField } from "@consumidor-positivo/aurora"
import FieldHolder from "../../wrappers/FieldHolder"

const SelectWidget = ({
  slug,
  options = [],
  value,
  autocomplete = false,
  fullScreenOptions = true,
  placeholder,
  label,
  sublabel,
  isRequired,
  hasError,
  errorMessage,
  disabled = false,
  onChange,
  onBlur
}) => {
  return (
    <FieldHolder title={label}>
      <SelectField
        id={slug}
        options={options}
        value={value}
        autocomplete={autocomplete}
        fullScreenOptions={fullScreenOptions}
        placeholder={placeholder}
        label={sublabel}
        required={isRequired}
        error={hasError}
        errorMessage={errorMessage}
        disabled={disabled}
        onChange={onChange}
        onBlur={(e) => onBlur(e.target.value)}
      />
    </FieldHolder>
  )
}

export default SelectWidget
