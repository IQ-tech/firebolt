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
  isOptional,
  isRequired,
  meta,
  useNumericKeyboard,
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
      useNumericKeyboard={useNumericKeyboard}
      ref={inputRef}
    />
  )
}

export default TextWidget
