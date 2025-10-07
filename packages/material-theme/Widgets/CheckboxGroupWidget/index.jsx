import React, { useState, useEffect } from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import FieldHolder from "../../FieldHolder";

const CheckboxGroupWidget = ({
  errorMessage,
  hasError,
  label = "Select option",
  isRequired,
  fieldId,
  options = [],
  onChange,
  value = [],
  onFocus
}) => {
  const [selectedOptions, setSelectedOptions] = useState(value);
  const [changedSelectedOptions, setChangedSelectedOptions] = useState(false);

  useEffect(() => {
    if (changedSelectedOptions) {
      onChange(selectedOptions);
    }
  }, [selectedOptions]);

  function handleSelectOption(value) {
    if (!changedSelectedOptions) setChangedSelectedOptions(true);
    const isAlreadySelected = selectedOptions.includes(value);
    const newSelectedOptions = isAlreadySelected
      ? selectedOptions.filter((item) => item !== value)
      : [...selectedOptions, value];

    setSelectedOptions(newSelectedOptions);
  }

  return (
    <FieldHolder>
      <FormControl required={isRequired} component="fieldset" error={hasError}>
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          {options.map(({ value: optionValue, label }, index) => (
            <FormControlLabel
              key={`${fieldId}-check-${index}`}
              control={
                <Checkbox
                  checked={value.includes(optionValue)}
                  onChange={() => handleSelectOption(optionValue)}
                  name={`${fieldId}-check-${index}`}
                  onFocus={(e) => onFocus(e?.target?.value)}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>

        {hasError && (
          <FormHelperText error id={`${fieldId}--error-internal`}>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </FieldHolder>
  );
};

export default CheckboxGroupWidget;
