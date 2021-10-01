import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FieldHolder from "../../FieldHolder";

const PasswordWidget = ({
  label,
  value,
  onChange,
  onBlur,
  isRequired,
  fieldId,
  hasError,
}) => {
  const [showPassword, setShowPassword] = useState(false);

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
          required={isRequired}
          onChange={(e) => onChange(e?.target?.value)}
          onBlur={(e) => onBlur(e?.target?.value)}
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
  );
};

export default PasswordWidget;
