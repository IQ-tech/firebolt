import React from "react"
import useEmailWidget from "./useEmailWidget"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import FieldHolder from "../../FieldHolder"

const EmailWidget = ({
  value,
  payload,

  // custom props
  placeholder,
  slug,
  errorMessage,
  hasError,
  label,
  modifyPayloadKeys,
  isRequired,

  // events
  onChange,
  onBlur,
  onFocus,
  inputRef
}) => {
  const { autoSuggestionOptions } = useEmailWidget({
    formPayload: payload,
    slug,
    modifyPayloadKeys,
  })

  return (
    <FieldHolder>
      <Autocomplete
        freeSolo
        value={value}
        options={autoSuggestionOptions}
        onInputChange={(_, newInputValue) => {
          onChange(newInputValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            inputRef={inputRef}
            error={hasError}
            required={isRequired}
            helperText={hasError ? errorMessage : ""}
            onBlur={(e) => onBlur(e?.target?.value)}
            onFocus={(e) => onFocus(e?.target?.value)}
            name={slug}
            variant="outlined"
            placeholder={placeholder}
          />
        )}
      />
    </FieldHolder>
  )
}

export default EmailWidget