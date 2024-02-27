import React from "react"
import FieldHolder from "../../FieldHolder"

const TextWidget = ({
  // html attributtes
  htmlType = "text",
  value,
  placeholder,
  isRequired,
  className,

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
    <FieldHolder label={label}>
      <div className="input-container">
        <input
          className={className}
          onChange={(e) => onChange(e?.target?.value)}
          onFocus={(e) => onFocus(e?.target?.value)}
          onBlur={(e) => onBlur(e?.target?.value)}
          value={value}
          ref={inputRef}
          id={slug}
          name={slug}
          placeholder={placeholder}
          type={htmlType}
          // maxlength="this.maxLength"
          // required="this.required"
          // inputmode="this.inputmode"
          // placeholder="this.placeholder"
          // disabled="this.disabled"
          // ngClass="{
          //   'ac-input-fail': this.formErrors.includes(this.controlName) && checkInputTouch()
          // }"
          // textMask="{ mask: this.inputMasksthis.type, guide: false }"
          // formControlName="this.controlName"
        />

        <label htmlFor={slug}>
          {sublabel}
        </label>

        {/* <div class="option-label-container">
      </div> */}

        {errorMessage ? <span
          // *ngIf="this.formErrors.includes(this.controlName) && checkInputTouch()"
          className="input-error-message"
        >
          {/* {
            genericErrorMessage[controlName] || partnerErrorMessage[controlName]
          } */}
        </span> : null}
      </div>
    </FieldHolder>
  )
}

export default TextWidget
