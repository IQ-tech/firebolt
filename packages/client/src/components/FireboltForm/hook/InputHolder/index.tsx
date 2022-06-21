import React from "react"
import useInputHolder, { IUseInputHolder } from "./hook"

const InputHolder = (props: IUseInputHolder) => {
  const { computedClasses, slug, nfieldProps } = useInputHolder(props)

  const { FieldComponent } = props

  return (
    <div className={computedClasses} data-fieldslug={slug}>
      <FieldComponent {...nfieldProps} />
    </div>
  )
}

export default InputHolder
