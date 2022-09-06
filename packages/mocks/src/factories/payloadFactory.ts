import { IStepFormPayload } from "@iq-firebolt/entities"
import Experience from "@iq-firebolt/entities/classes/Experience"
import { IMockPayloadOptions } from "../types"

const payloadFactory = (
  payloadOptions: IMockPayloadOptions,
  experience: Experience
): IStepFormPayload => {
  const { stepSlug, validFields } = payloadOptions
  const payload: IStepFormPayload = {}
  const flow = experience.getStepBySlug(stepSlug)

  return payload
}

export default payloadFactory
