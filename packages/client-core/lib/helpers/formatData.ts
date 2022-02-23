import Step from "../entities/Step";
import FormMetaData from "../entities/FormMeta";

export function formatStepResponseData(requestData = {}) {
  const { auth, step = {}, meta = {}, capturedData = {} }: any = requestData;

  const formattedData = {
    auth,
    meta: FormMetaData(meta),
    capturedData,
    step: Step(step),
  };

  return formattedData;
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
