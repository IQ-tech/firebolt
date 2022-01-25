import React from 'react'
import { PasswordField } from "iq-blueberry"
import getTooltipConfig from "../../helpers/getTooltipConfig"

const PasswordWidget = ({
  hasError,
  errorMessage,
  label,
  onBlur,
  onChange,
  placeholder,
  slug,
  value,
  isOptional,
  isRequired,
  meta,
}) => {
  return (
    <PasswordField
      required={isRequired}
      optional={isOptional}
      invalid={hasError}
      errorMessage={errorMessage}
      label={label}
      onBlur={(e) => onBlur(e?.target?.value)}
      onChange={onChange}
      placeholder={placeholder}
      name={slug}
      value={value}
      tooltipConfig={getTooltipConfig(meta)}
    />
  )
}

export default PasswordWidget
