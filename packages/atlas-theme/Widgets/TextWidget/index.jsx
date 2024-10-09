import React, { useEffect, useState } from "react"
import FieldHolder from "../../FieldHolder"
import classNames from "classnames";

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
  const [inputValue, setInputValue] = useState()

  useEffect(() => {
    if(value) {
      setInputValue(value)
    }
  }, [value])

  return (
    <FieldHolder label={label}>
      <div className="input-container">
        <input
          className={className}
          onChange={(e) => onChange(e?.target?.value)}
          onFocus={(e) => onFocus(e?.target?.value)}
          onBlur={(e) => onBlur(e?.target?.value)}
          value={inputValue}
          ref={inputRef}
          id={slug}
          name={slug}
          placeholder={placeholder}
          type={htmlType}
          maxLength={maxLength}
          required={isRequired}
          min={min}
          max={max}
        />

        <label htmlFor={slug} className={classNames({ required: isRequired })}>
          {sublabel}
        </label>

        {hasError && errorMessage ? <span
          className="input-error-message"
        >
          {errorMessage}
        </span> : null}
      </div>
    </FieldHolder>
  )
}

export default TextWidget
