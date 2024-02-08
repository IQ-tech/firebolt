import React from "react"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import FormHelperText from "@material-ui/core/FormHelperText"
import FieldHolder from "../../FieldHolder"

import "./styles.scss"

const RadioGroupWidget = ({
  options = [],
  fieldId,
  label = "Choose value",
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
      {options.map((option) => (
        <fieldset className="radio__option" key={option.value}>
          <input
            type="radio"
            checked={value === option.value}
            onBlur={(e) => onBlur(e?.target?.value)}
            value={option.value}
            onChange={(e) => onChange(e?.target?.value)}
            onFocus={(e) => onFocus(e?.target?.value)}
          />

          <label>{option.label}</label>
        </fieldset>
      ))}
    </FieldHolder>
  )
}

export default RadioGroupWidget
