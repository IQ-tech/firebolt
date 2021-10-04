import React, { Fragment } from "react"
import PropTypes from "prop-types"

import useWizard from "./hook"
import { childrenOf } from "../../helpers"
import { filterChildren } from "./helpers"

import Step from "./Step"

const Wizard = ({
  children,
  fallback,
  onChangeStep,
  onConnectionError,
  onFinishForm,
}) => {
  const { hasFormLoaded, currentStepId } = useWizard({
    onChangeStep,
    onConnectionError,
    onFinishForm,
  })

  return (
    <Fragment>
      {hasFormLoaded
        ? filterChildren(children, currentStepId)
        : !!fallback
        ? fallback
        : null}
    </Fragment>
  )
}

Wizard.Step = Step
Wizard.propTypes = {
  children: childrenOf(Step),
  // render while form load
  fallback: PropTypes.node,
  // function to run on change step
  onChangeStep: PropTypes.func,
  // function to run when there is a connection error with Firebolt back-end api
  onConnectionError: PropTypes.func,
  /** Callback to run on form end */
  onFinishForm: PropTypes.func,
}

export default Wizard
