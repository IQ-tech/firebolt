import React from "react"
import useStep from "./hook"

const Step = ({ component, ...props }) => {
  const { fireboltStep } = useStep()

  const FormStepComponent = component
  return <FormStepComponent fireboltStep={fireboltStep} {...props} />
}

export default Step
