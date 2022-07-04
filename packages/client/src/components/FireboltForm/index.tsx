import React from "react"

import Insert from "./Insert"
import useFireboltForm from "./hook"
// @ts-ignore
import classes from "./style.module.css"
import { IFireboltForm } from "../../types"

const FireboltForm = ({
  submitBtnText = "Next Step",
  previousBtnText = "Previous Step",
  className,
  customActionsChild,

  schema,
  children = [],
  onChange,
  onSubmit,
  theme,
  autoFill,
  remoteErrors,
  onGoBack,
  onFocusField,
  addons,
  clearRemoteFieldError
}: IFireboltForm) => {
  const { handleSubmit, formChildren, actionsChildData, handleGoBack } =
    useFireboltForm({
      schema,
      children,
      onChange,
      onSubmit,
      theme,
      autoFill,
      remoteErrors,
      onGoBack,
      classes,
      onFocusField,
      addons,
      clearRemoteFieldError
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

export default FireboltForm
