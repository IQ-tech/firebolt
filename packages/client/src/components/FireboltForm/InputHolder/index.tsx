import React from "react"
import useInputHolder, { IUseInputHolder } from "./hook"

const InputHolder = (props: IUseInputHolder) => {
  const { computedClasses, slug, fieldProps } = useInputHolder(props)

  const { FieldComponent } = props

  return (
    <div className={computedClasses} data-fieldslug={slug}>
      <FieldComponent {...fieldProps} />
    </div>
  )
}

export default InputHolder
