import evaluate from "simple-evaluate"

export default function getConditionalProps({ propsConditional, formPayload }) {
  if (!propsConditional) return {}
  const safePropsConditional = propsConditional || []

  return safePropsConditional.reduce(
    (acc, { conditional = "", props = {} }) => {
      const isConditionValid = evaluate({ step: formPayload }, conditional)
      return {
        ...acc,
        ...(isConditionValid ? { ...props } : {}),
      }
    },
    {}
  )
}
