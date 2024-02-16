import React from 'react'
import { RadioField } from "iq-blueberry"
import getTooltipConfig from "../../helpers/getTooltipConfig"

const RadioWidget = ({
  hasError,
  errorMessage,
  label,
  onChange,
  value,
  isRequired,
  options,
  slug,
  meta,
  onBlur
}) => {
  return (
    <RadioField
      tooltipConfig={getTooltipConfig(meta)}
      options={options}
      required={isRequired}
      value={value}
      label={label}
      name={slug}
      invalid={hasError}
      errorMessage={errorMessage}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

export default RadioWidget
