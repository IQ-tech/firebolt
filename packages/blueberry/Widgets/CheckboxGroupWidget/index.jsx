import React from 'react'
import { CheckboxGroup } from "iq-blueberry"
import getTooltipConfig from "../../helpers/getTooltipConfig"

const CheckboxGroupWidget = ({
  hasError,
  errorMessage,
  label,
  onChange,
  value,
  isRequired,
  meta,
  options,
  fieldId,
  columns
}) => {
  return (
    <CheckboxGroup
      required={isRequired}
      label={label}
      value={value}
      onChange={onChange}
      options={options}
      name={fieldId}
      tooltipConfig={getTooltipConfig(meta)}
      invalid={hasError}
      errorMessage={errorMessage}
      columns={columns}
    />
  )
}

export default CheckboxGroupWidget
