import StepData from "../entities/StepData";
import FormMetaData from "../entities/FormMeta";

export default function formatStepTransitionData(requestData = {}) {
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
