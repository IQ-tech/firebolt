import React from "react"
import PropTypes from "prop-types"

import Insert from "./Insert"
import useFireboltForm from "./hook"
// @ts-ignore
import classes from "./style.module.css"

const FireboltForm = ({
  submitBtnText = "Next Step",
  previousBtnText = "Previous Step",
  className,
  customActionsChild,
  children = [],
  autoFill,

  theme,
  schema,
  remoteErrors,
  onSubmit,
  onGoBack,
  onChange,
  onFocusField,
}) => {
  const { handleSubmit, formChildren, actionsChildData, handleGoBack } =
    useFireboltForm({
      autoFill,
      remoteErrors,

      theme,
      schema,
      onSubmit,
      children,
      onChange,
      onGoBack,
      classes,
      onFocusField,
    })

  const ActionsChild = customActionsChild

  return (
    <form className={className} onSubmit={handleSubmit} autoComplete="off">
      <div className={classes["firebolt-form-wrapper"]}>{formChildren}</div>

      {!!customActionsChild ? (
        <ActionsChild formData={actionsChildData} />
      ) : (
        <>
          <button
            color="secondary"
            style={{ marginRight: "5px" }}
            data-testid="fbt-submit-button"
            onClick={handleGoBack}
          >
            {previousBtnText}
          </button>
          <button color="primary" onClick={handleSubmit}>
            {submitBtnText}
          </button>
        </>
      )}
    </form>
  )
}

FireboltForm.Insert = Insert

FireboltForm.propTypes = {
  /** Children to be rendered instead of default submit button */
  submitText: PropTypes.string,
  /** Object to autofill form payload */
  autoFill: PropTypes.object,
  /** fields adapter - allow firebolt to use custom components to firebolt base fields */
  theme: PropTypes.object,
}

export default FireboltForm
