import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
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
