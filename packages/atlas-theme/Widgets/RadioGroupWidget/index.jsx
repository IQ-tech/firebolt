import React from "react"
import FieldHolder from "../../FieldHolder"

import "./styles.scss"

const RadioGroupWidget = ({
  options = [],
  fieldId,
  label = "Choose value",
  sublabel,
  onChange,
  value,
  onBlur,
  hasError,
  errorMessage,
  isRequired,
  onFocus,
}) => {
  return (
    <FieldHolder label={label} useLabel fieldName={fieldId}>
      <div className="radio-group">
        <p>{sublabel}</p>

        {options.map((option) => (
          <label className="radio__option" key={option.value}>
            <input
              type="radio"
              checked={value === option.value}
              onBlur={(e) => onBlur(e?.target?.value)}
              value={option.value}
              onChange={(e) => onChange(e?.target?.value)}
              onFocus={(e) => onFocus(e?.target?.value)}
            />

            {option.label}
          </label>
        ))}
      </div>
    </FieldHolder>
  )
}

export default RadioGroupWidget
