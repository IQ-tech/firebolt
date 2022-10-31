import createNumberMask from "text-mask-addons/dist/createNumberMask"
import { validateFBTField } from "@iq-firebolt/validators"
import { IStepConfigField } from "@iq-firebolt/client-core"
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

interface INumberMaskConfig {
  prefix: string
  suffix: string
  includeThousandsSeparator: boolean
  thousandsSeparatorSymbol: string
  allowDecimal: boolean
  decimalSymbol: string
  decimalLimit: number
  requireDecimal: boolean
  allowNegative: boolean
  allowLeadingZeroes: boolean
  integerLimit: number | null
}
type RegexOrString = RegExp | string
export type ResolvedMask = RegexOrString[]
type MaskGenerator = (value: string) => ResolvedMask
type ParseMaskArg = MaskGenerator | ResolvedMask | INumberMaskConfig
type ParseMaskReturn = ResolvedMask | ((value: string) => ResolvedMask)

export function parseMask(rawMask: ParseMaskArg): ParseMaskReturn | undefined {
  if (!rawMask) return
  if (typeof rawMask === "function") {
    return (value: string) => {
      const resolvedMask = rawMask(value)
      const stringMask = parseMask(resolvedMask) as ResolvedMask
      return stringMask
    }
  } else if (Array.isArray(rawMask)) {
    return rawMask.map((item) => {
      const isEncodedRegex = typeof item === "string" && item.startsWith("/") && item.endsWith("/") && item !== "/"
      const isRegex = item instanceof RegExp
      if (isRegex) {
        return item
      } else if (isEncodedRegex) {
        return regexParser(item)
      }
      return item
    })
  } else if (typeof rawMask === "object") {
    return createNumberMask(rawMask)
  }
}