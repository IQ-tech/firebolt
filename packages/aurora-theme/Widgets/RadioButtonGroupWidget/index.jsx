import React from "react"
import FieldHolder from "../../FieldHolder"

import "./styles.scss"

const RadioButtonGroupWidget = ({
  options = [],
  fieldId,
  label = "Choose value",
  onChange,
  value,
  onBlur,
  onFocus
}) => {
  return (
    <FieldHolder label={label} useLabel={true} fieldName={fieldId}>
      <div className="options-container">
        {
          options.map((option) => (
            <label className="radio__option" key={option.value}>
              <input
                type="checkbox"
                checked={value === option.value}
                onBlur={(e) => onBlur(e?.target?.value)}
                value={option.value}
                onChange={(e) => onChange(e?.target?.value)}
                onFocus={(e) => onFocus(e?.target?.value)}
              />

              <span>{option.label}</span>
          </label>
          ))
        }
      </div>
    </FieldHolder>
  )
}

export default RadioButtonGroupWidget
