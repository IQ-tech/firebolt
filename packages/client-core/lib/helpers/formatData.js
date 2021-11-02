import StepData from "../entities/StepData";
import FormMetaData from "../entities/FormMeta";

export function formatStepResponseData(requestData = {}) {
  const {
    webhookResult = {},
    auth,
    step = {},
    meta = {},
    capturedData = {},
  } = requestData;

  return {
    /** @type {string} */
    auth,
    meta: FormMetaData(meta),
    capturedData,
    step: {
      /** @type {StepData} */
      data: StepData({ ...step }),
      webhookResult,
    },
  };
}

export function formatReqPayload({
  stepSlug,
  stepFieldsPayload = {},
  metadata = {},
}) {
  const formattedFields = Object.keys(stepFieldsPayload).map((itemKey) => ({
    slug: itemKey,
    value: stepFieldsPayload[itemKey],
  }));

  return JSON.stringify({
    step: {
      slug: stepSlug,
      fields: formattedFields,
    },
    metadata,
  });
}
