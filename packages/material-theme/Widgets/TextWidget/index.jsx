import React from "react"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import FieldHolder from "../../FieldHolder"

const TextWidget = ({
  // html attributtes
  htmlType = "text",
  value,
  placeholder,
  isRequired,

  // custom props
  slug,
  errorMessage,
  hasError,
  label,
  fieldId,

  // events
  onChange,
  onBlur,
  onFocus,
  inputRef,
}) => {
  return (
    <FieldHolder my="30px">
      <FormControl fullWidth>
        <TextField
          required={isRequired}
          id={fieldId}
          error={hasError}
          label={label}
          type={htmlType}
          helperText={hasError ? errorMessage : ""}
          name={slug}
          value={value}
          inputRef={inputRef}
          placeholder={placeholder}
          onChange={(e) => onChange(e?.target?.value)}
          onBlur={(e) => onBlur(e?.target?.value)}
          onFocus={(e) => onFocus(e?.target?.value)}
          autoComplete="off"
          variant="outlined"
        />
      </FormControl>
    </FieldHolder>
  )
}

export default TextWidget
