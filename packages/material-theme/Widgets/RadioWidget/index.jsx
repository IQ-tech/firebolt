import React from "react"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import FormHelperText from "@mui/material/FormHelperText"
import FieldHolder from "../../FieldHolder"

const RadioWidget = ({
  options = [],
  fieldId,
  label = "Choose value",
  onChange,
  value,
  onBlur,
  hasError,
  errorMessage,
  isRequired,
  onFocus
}) => {
  return (
    <FieldHolder>
      <FormControl
        required={isRequired}
        component="fieldset"
        fullWidth
        error={hasError}
      >
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          name={fieldId}
          onBlur={(e) => onBlur(e?.target?.value)}
          value={value}
          onChange={(e) => onChange(e?.target?.value)}
          onFocus={(e) => onFocus(e?.target?.value)}
        >
          {options.map(({ value, label }, index) => (
            <FormControlLabel
              key={`${fieldId}-option-${index}`}
              value={value}
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
        {hasError && (
          <FormHelperText error id={`${fieldId}--error-internal`}>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </FieldHolder>
  )
}

export default RadioWidget
