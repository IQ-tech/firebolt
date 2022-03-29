import { IExperienceProceedPayload } from "../interfaces/IEngine"

export default function hasFilledFields(
  payload?: IExperienceProceedPayload
): boolean {
  return (
    !!payload && !!payload?.fields && Object.keys(payload.fields).length > 0
  )
}
