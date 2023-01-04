import React from "react"
import { EmailField } from "iq-blueberry"
import getTooltipConfig from "../../helpers/getTooltipConfig"

const EmailWidget = ({
  hasError,
  errorMessage,
  label,
  onBlur,
  onFocus,
  onChange,
  placeholder,
  slug,
  value,
  isOptional,
  isRequired,
  meta,
}) => {
  return (
    <EmailField
      autoComplete="none"
      required={isRequired}
      optional={isOptional}
      invalid={hasError}
      errorMessage={errorMessage}
      label={label}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
      placeholder={placeholder}
      name={slug}
      value={value}
      tooltipConfig={getTooltipConfig(meta)}
    />
  )
}

export default EmailWidget
