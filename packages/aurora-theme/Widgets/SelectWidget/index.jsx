import React from "react"
import { SelectField } from "@consumidor-positivo/aurora"
import FieldHolder from "../../wrappers/FieldHolder"

const SelectWidget = ({
  htmlType = "text",
  slug,
  options = [],
  value,
  autocomplete = false,
  fullScreenOptions = false,
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
        htmlType={htmlType}
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
