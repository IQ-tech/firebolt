import React from "react"
import { InputField } from "@consumidor-positivo/aurora"

const TextWidget = ({
  // html attributtes
  htmlType = "text",
  value,
  placeholder,
  isRequired,
  className,
  maxLength,
  min,
  max,

  // custom props
  slug,
  errorMessage,
  hasError,
  label,
  sublabel,
  fieldId,

  // events
  onChange,
  onBlur,
  onFocus,
  inputRef,
}) => {
  return (
    <InputField
      value={value}
      id={slug}
      name={slug}
      ref={inputRef}
      label={label}
      placeholder={placeholder}
      required={isRequired}
      requiredInput={isRequired}
      error={hasError}
      errorMessage={errorMessage}
      className={className}
      type={htmlType}
      maxLength={maxLength}
      min={min}
      max={max}
      onChange={(e) => onChange(e?.target?.value)}
      onFocus={(e) => onFocus(e?.target?.value)}
      onBlur={(e) => onBlur(e?.target?.value)}
    />
  )
}

export default TextWidget
