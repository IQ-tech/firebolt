import React from "react"
import { TextAreaField } from "@consumidor-positivo/aurora"
import FieldHolder from "../../wrappers/FieldHolder"

const TextAreaWidget = ({
  hasError,
  errorMessage,
  label,
  sublabel,
  onBlur,
  onFocus,
  onChange,
  placeholder,
  slug,
  value,
  isOptional,
  isRequired,
  rows,
  cols,
  spellcheck,
  resize,
  horizontalResize,
  minLength,
  maxLength,
  inputRef,
}) => {
  return (
    <FieldHolder title={label}>
      <TextAreaField
        required={isRequired}
        optional={isOptional}
        error={hasError}
        errorMessage={errorMessage}
        label={sublabel}
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
        textareaRef={inputRef}
        horizontalResize={horizontalResize}
      />
    </FieldHolder>
  )
}

export default TextAreaWidget
