import React from "react"
import FormControl from "@material-ui/core/FormControl"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const CheckWidget = ({
  hasError,
  onChange,
  label,
  value,
  fieldId,
  isRequired,
  onFocus
}) => {
  return (
    <FormControl required={isRequired} error={hasError}>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            checked={!!value}
            onChange={() => onChange(!value)}
            onFocus={(e) => onFocus(e?.target?.value)}
            name={fieldId}
          />
        }
      />
    </FormControl>
  )
}

export default CheckWidget
