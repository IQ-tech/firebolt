import StepData from "./StepData";

export default function Step({
  data = StepData(),
  webhookResult = {},
  position = Number(),
}) {
  return {
    /**  @type {StepData} */
    data: StepData(data),
    /**  @type {Object} */
    webhookResult,
    /**  @type {number} */
    position,
  };
}
