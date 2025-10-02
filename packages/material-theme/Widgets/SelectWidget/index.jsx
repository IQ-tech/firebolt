import React from "react"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import FieldHolder from "../../FieldHolder"

const SelectWidget = ({
  slug,
  options = [],
  label,
  placeholder,

  hasError,
  errorMessage,
  value = "",
  fieldId,
  isRequired,

  onChange,
  onBlur,
  onFocus
}) => {
  return (
    <FieldHolder>
      <FormControl
        required={isRequired}
        error={hasError}
        fullWidth
        variant="outlined"
      >
        <InputLabel shrink htmlFor={fieldId}>
          {label}
        </InputLabel>
        <Select
          id={fieldId}
          label={label}
          value={value}
          onChange={(e) => onChange(e?.target?.value)}
          onBlur={(e) => onBlur(e?.target?.value)}
          onFocus={(e) => !!onFocus && onFocus(e?.target?.value)}
          placeholder={placeholder}
          displayEmpty
        >
          <MenuItem value="" disabled>
            <em>{placeholder}</em>
          </MenuItem>
          {options.map(({ value, label }, i) => (
            <MenuItem key={`menu-item-${slug}-${i}`} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FieldHolder>
  )
}

export default SelectWidget
