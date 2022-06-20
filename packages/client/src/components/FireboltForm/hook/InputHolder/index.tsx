import React from "react"
import useInputHolder, { IUseInputHolder } from "./hook"

const InputHolder = (props: IUseInputHolder) => {
  const {
    computedClasses,
    slug,
    onBlurFieldHandler,
    onFocusFieldHandler,
    onChangeFieldHandler,
  } = useInputHolder(props)

  const { FieldComponent, fieldProps } = props

  return (
    <div className={computedClasses} data-fieldslug={slug}>
      <FieldComponent
        {...fieldProps}
        onChange={onChangeFieldHandler}
        onBlur={onBlurFieldHandler}
        onFocus={onFocusFieldHandler}
      />
    </div>
  )
}

export default InputHolder
