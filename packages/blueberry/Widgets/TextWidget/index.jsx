import React from "react"
import { InputField } from "iq-blueberry"
import getTooltipConfig from "../../helpers/getTooltipConfig"

const TextWidget = ({
  hasError,
  htmlType = "text",
  errorMessage,
  label,
  onBlur,
  onFocus,
  onChange,
  placeholder,
  slug,
  value,
  mask,
  isOptional,
  isRequired,
  meta,
  useNumericKeyboard,
  maxLength,
  inputRef,
}) => {
  return (
    <InputField
      tooltipConfig={getTooltipConfig(meta)}
      required={isRequired}
      optional={isOptional}
      invalid={hasError}
      htmlType={htmlType}
      errorMessage={errorMessage}
      label={label}
      onBlur={(e) => onBlur(e?.target?.value)}
      onFocus={(e) => onFocus(e?.target?.value)}
      onChange={onChange}
      placeholder={placeholder}
      name={slug}
      value={value}
      mask={mask}
      useNumericKeyboard={useNumericKeyboard}
      maxLength={maxLength}
      inputRef={inputRef}
    />
  )
}

export default TextWidget
