import { InputField } from "@consumidor-positivo/aurora"
import FieldHolder from "../../wrappers/FieldHolder"
import { LabelHolder } from "../../wrappers/LabelHolder"

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
  tooltipText,

  // events
  onChange,
  onBlur,
  onFocus,
  inputRef,
}) => {
  return (
    <FieldHolder title={label}>
      <InputField
        value={value}
        id={slug}
        name={slug}
        inputRef={inputRef}
        label={<LabelHolder label={sublabel} tooltipText={tooltipText} />}
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
    </FieldHolder>
  )
}

export default TextWidget
