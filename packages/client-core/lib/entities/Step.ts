import StepData from "./StepData";

export default function Step({
  data = StepData(),
  webhookResult = {},
  position = Number(),
}) {
  return {
    data: StepData(data),
    webhookResult,
    position,
  };
}
