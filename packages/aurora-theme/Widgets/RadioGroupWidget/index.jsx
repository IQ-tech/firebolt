import React from "react"
import { Radio } from "@consumidor-positivo/aurora"
import FieldHolder from "../../wrappers/FieldHolder"

const RadioGroupWidget = ({
  options = [],
  fieldId,
  label,
  sublabel,
  value,
  hasError,
  errorMessage,
  isRequired,
  onChange,
  onFocus,
}) => {
  return (
    <FieldHolder title={label}>
      <Radio.Group
        name={fieldId}
        label={sublabel}
        defaultValue={value}
        error={hasError}
        errorMessage={errorMessage}
        required={isRequired}
        onChange={(e) => onChange(e?.target?.value)}
        onFocus={(e) => onFocus(e?.target?.value)}
      >
        {options.map((option, index) => {
          return (
            <Radio.Field
              key={index}
              value={option.value}
              label={option.label}
            />
          )
        })}
      </Radio.Group>
    </FieldHolder>
  )
}

export default RadioGroupWidget
