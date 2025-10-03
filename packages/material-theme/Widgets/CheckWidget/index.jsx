import React from "react"
import FormControl from "@mui/material/FormControl"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"

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
