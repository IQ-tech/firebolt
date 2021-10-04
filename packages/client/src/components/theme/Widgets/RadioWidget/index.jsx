import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import FormHelperText from "@material-ui/core/FormHelperText"
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
