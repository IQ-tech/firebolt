import React from 'react'
import { SelectField } from "iq-blueberry"
import getTooltipConfig from "../../helpers/getTooltipConfig"

const SelectWidget = ({
  hasError,
  errorMessage,
  label,
  onBlur,
  onChange,
  slug,
  value,
  options,
  isOptional,
  isRequired,
  meta,
}) => {
  return (
    <SelectField
      required={isRequired}
      optional={isOptional}
      invalid={hasError}
      value={value}
      onBlur={(e) => onBlur(e?.target?.value)}
      onChange={onChange}
      name={slug}
      label={label}
      options={options}
      errorMessage={errorMessage}
      tooltipConfig={getTooltipConfig(meta)}
    />
  )
}

export default SelectWidget
