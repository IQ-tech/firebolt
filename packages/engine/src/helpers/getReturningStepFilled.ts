import { IStepJSON } from "../types"
import { IFireboltSession } from "../interfaces/IEngine"

export default function getReturningStepFilled(
  stepDefinition: IStepJSON,
  session?: IFireboltSession
): IStepJSON {
  const stepSlug = stepDefinition.slug
  const filledFields = session?.steps?.[stepSlug]?.fields
  if (!filledFields) return stepDefinition

  const newFields = stepDefinition.fields?.map((field) => {
    const isFieldAlreadyFilled = Object.keys(filledFields).includes(field.slug)
    if (!isFieldAlreadyFilled) {
      return field
    } else {
      const fieldSlug = field.slug
      const fieldValue = filledFields[fieldSlug]
      return { ...field, value: fieldValue }
    }
  })

  return { ...stepDefinition, fields: newFields }
}