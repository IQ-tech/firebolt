import {
  IFireboltSession,
  IExperienceProceedPayload,
} from "../types"
import { equals } from "ramda"

interface IIsFieldsValidationNeeded {
  isCustomStep: boolean
  isAnAlreadyVisitedStep: boolean
  session: IFireboltSession
  receivingStepSlug: string
  payload: IExperienceProceedPayload
}

export default function isFieldsValidationNeeded({
  isCustomStep,
  isAnAlreadyVisitedStep,
  session,
  receivingStepSlug,
  payload,
}: IIsFieldsValidationNeeded): boolean {
  if (isCustomStep) return false
  if (isAnAlreadyVisitedStep) {
    const storedReceivedStepPayload =
      session?.steps?.[receivingStepSlug]?.fields
    const paramReceivedStepPayload = payload.fields
    return !equals(storedReceivedStepPayload, paramReceivedStepPayload)
  }
  return true
}
