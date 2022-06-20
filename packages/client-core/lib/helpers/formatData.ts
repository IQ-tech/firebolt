import { 
  IFormResponseData,
  IFormStep,
  IFormStepBasicInfo,
} from "../types"

export function formatStepResponseData(requestData): IFormResponseData {
  const safeRequestData = requestData || {}
  const {
    auth,
    step: stepFromJSON,
    meta: metaFromJSON,
    capturedData = {},
  } = safeRequestData

  const formatFormMetaItem = ({
    slug = "",
    position = Number(),
    friendlyname = "",
  } = {}): IFormStepBasicInfo => {
    return { slug, friendlyName: friendlyname, position }
  }

  const formatStepData = (stepFromJSON): IFormStep => {
    const { data, webhookResult = {} } = stepFromJSON || {}
    const { friendlyname: friendlyName = "", ...restData } = data || {}
    return {
    ...stepFromJSON,
    webhookResult,
    data: {
      ...restData,
      friendlyName,
    }
  }}

  const metaSteps = metaFromJSON?.forms || []

  const formattedData = {
    auth,
    step: formatStepData(stepFromJSON),
    meta: {
      lastStep: metaFromJSON?.lastStep,
      steps: metaSteps.map(item => formatFormMetaItem(item))
    },
    capturedData,
  }

  return formattedData
}

export function formatReqPayload({
  stepSlug,
  stepFieldsPayload = {},
  metadata = {},
}) {
  const formattedFields = Object.keys(stepFieldsPayload).map((itemKey) => ({
    slug: itemKey,
    value: stepFieldsPayload[itemKey],
  }))

  return JSON.stringify({
    step: {
      slug: stepSlug,
      fields: formattedFields,
    },
    metadata,
  })
}
