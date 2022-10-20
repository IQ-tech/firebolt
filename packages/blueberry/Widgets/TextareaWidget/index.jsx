import React from 'react'
import { TextareaField } from "iq-blueberry"
import getTooltipConfig from "../../helpers/getTooltipConfig"

const TextWidget = ({
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
  rows,
  cols,
  spellcheck,
  resize,
  minLength,
  maxLength,
  inputRef,
}) => {
  return (
    <TextareaField
      tooltipConfig={getTooltipConfig(meta)}
      required={isRequired}
      optional={isOptional}
      invalid={hasError}
      errorMessage={errorMessage}
      label={label}
      onBlur={(e) => onBlur(e?.target?.value)}
      onFocus={(e) => onFocus(e?.target?.value)}
      onChange={onChange}
      placeholder={placeholder}
      name={slug}
      value={value}
      rows={rows}
      cols={cols}
      spellcheck={spellcheck}
      resize={resize}
      minLength={minLength}
      maxLength={maxLength}
      inputRef={inputRef}
    />
  )
}

export default TextWidget
