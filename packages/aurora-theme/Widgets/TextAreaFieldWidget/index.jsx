import { TextAreaField } from "@consumidor-positivo/aurora"
import FieldHolder from "../../wrappers/FieldHolder"
import { LabelHolder } from "../../wrappers/LabelHolder"

const TextAreaFieldWidget = ({
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
  tooltipText,
}) => {
  return (
    <FieldHolder title={label}>
      <TextAreaField
        required={isRequired}
        optional={isOptional}
        error={hasError}
        errorMessage={errorMessage}
        label={<LabelHolder label={sublabel} tooltipText={tooltipText} />}
        onBlur={(e) => onBlur(e?.target?.value)}
        onFocus={(e) => onFocus(e?.target?.value)}
        onChange={(e) => onChange(e?.target?.value)}
        placeholder={placeholder}
        id={slug}
        name={slug}
        value={value}
        rows={rows}
        cols={cols}
        spellCheck={spellcheck}
        resize={resize}
        minLength={minLength}
        maxLength={maxLength}
        textareaRef={inputRef}
        horizontalResize={horizontalResize}
      />
    </FieldHolder>
  )
}

export default TextAreaFieldWidget
