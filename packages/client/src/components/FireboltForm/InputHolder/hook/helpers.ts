import { validateFBTField } from "@iq-firebolt/validators/src"
import { IStepConfigField } from "@iq-firebolt/client-core/lib"
import evaluate from "simple-evaluate"
import regexParser from "regex-parser"

export function getConditionalProps({ propsConditional, formPayload }) {
  if (!propsConditional) return {}
  const safePropsConditional = propsConditional || []

  return safePropsConditional.reduce(
    (acc, { conditional = "", props = {} }) => {
      const isConditionValid = evaluate({ step: formPayload }, conditional)
      return {
        ...acc,
        ...(isConditionValid ? { ...props } : {}),
      }
    },
    {}
  )
}

interface IvalidateField {
  value: string
  field: IStepConfigField
  formPayload: { [fieldSlug: string]: any }
}
export function validateField({ value, field, formPayload }: IvalidateField) {
  return validateFBTField({
    value,
    field,
    formPayload,
    context: "client",
  })
}

type RegexOrString = RegExp | string
export type ResolvedMask = RegexOrString[]
type MaskGenerator = (value: string) => ResolvedMask
type ParseMaskArg = MaskGenerator | ResolvedMask
type ParseMaskReturn = ResolvedMask | ((value: string) => ResolvedMask)

export function parseMask(rawMask: ParseMaskArg): ParseMaskReturn {
  if(!rawMask) return
  if (typeof rawMask === "function") {
    return (value: string) => {
      const resolvedMask = rawMask(value)
      const stringMask = parseMask(resolvedMask) as ResolvedMask
      return stringMask
    }
  } else {
    return rawMask.map((item) => {
      const isEncodedRegex = typeof item === "string" && item.startsWith("/")
      const isRegex = item instanceof RegExp
      if (isRegex) {
        return item
      } else if (isEncodedRegex) {
        return regexParser(item)
      }
      return item
    })
  }
}
