import { useEffect, useRef } from "react"
import classNames from "classnames"
import { getFieldProps, IStepConfigField } from "@iq-firebolt/client-core/lib"

// @ts-ignore
import classes from "./style.module.css"

interface IUseInputHolder {
  fieldConfig: IStepConfigField
}

export default function useInputHolder({ fieldConfig }: IUseInputHolder) {
  const inputRef = useRef(null)
  
  const {
    slug,
    meta = {},
    conditional,
    "ui:widget": widgetName,
    "ui:props": propsFromSchema = {},
    "ui:styles": propsStyles,
    "ui:props-conditional": propsConditional,
  } = fieldConfig

  const computedClasses = classNames(classes["firebolt-input"], {
    [classes["firebolt-input--half"]]: propsStyles?.size === "half",
  })

  useEffect(() => {
    console.log("input loaded", "sdf")
  }, [])

  function onChangeField() {
    console.log("changed")
  }

  function onBlurField() {
    console.log("blurred")
  }

  function onFocusField() {
    console.log("focused")
  }

  return { computedClasses, slug, onChangeField, onBlurField, onFocusField }
}
