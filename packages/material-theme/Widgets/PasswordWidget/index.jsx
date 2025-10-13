import React, { useState } from "react"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import FieldHolder from "../../FieldHolder"

const PasswordWidget = ({
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  isRequired,
  fieldId,
  hasError,
  inputRef,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FieldHolder>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor={fieldId}>{label}</InputLabel>
        <OutlinedInput
          error={hasError}
          id={fieldId}
          type={showPassword ? "text" : "password"}
          value={value}
          autoComplete="off"
          inputRef={inputRef}
          required={isRequired}
          onChange={(e) => onChange(e?.target?.value)}
          onBlur={(e) => onBlur(e?.target?.value)}
          onFocus={(e) => onFocus(e?.target?.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e?.preventDefault()}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
    </FieldHolder>
  )
}

export default PasswordWidget
