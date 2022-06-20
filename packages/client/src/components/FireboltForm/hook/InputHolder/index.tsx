import React from "react"
import { IStepConfigField } from "@iq-firebolt/client-core/lib"

import useInputHolder from "./hook"

interface IInputHolder {
  FieldComponent: any
  fieldProps: any
  fieldConfig: IStepConfigField
}

const InputHolder = ({
  FieldComponent,
  fieldProps,
  fieldConfig,
}: IInputHolder) => {
  const { computedClasses, slug, onBlurField, onFocusField, onChangeField } =
    useInputHolder({ fieldConfig })

  return (
    <div className={computedClasses} data-fieldslug={slug}>
      <FieldComponent
        {...fieldProps}
        onChange={onChangeField}
        onBlur={onBlurField}
        onFocus={onFocusField}
      />
    </div>
  )
}

export default InputHolder
