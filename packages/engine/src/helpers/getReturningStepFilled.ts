import { IStepConfig, IFireboltSession } from "@iq-firebolt/entities"

export default function getReturningStepFilled(
  stepDefinition: IStepConfig,
  session?: IFireboltSession
): IStepConfig {
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
