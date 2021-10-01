import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"

import If from "../If"
import Insert from "./Insert"

import useFireboltForm from "./hook"

const FireboltForm = ({
  fireboltStep,
  submitText = "",
  className,
  customActionsChild,
  children = [],
  autoFill,

  theme,
  schema,
  remoteErrors,
  onSubmit,
  onChange,
}) => {
  const { handleSubmit, formChildren, actionsChildData } = useFireboltForm({
    className,
    fireboltStep,
    autoFill,
    theme,

    schema,
    remoteErrors,
    onSubmit,
    children,
    onChange,
  })

  const ActionsChild = customActionsChild

  return (
    <form className={className} onSubmit={handleSubmit} autoComplete="off">
      {formChildren}
      <If
        condition={!!customActionsChild}
        renderIf={<ActionsChild formData={actionsChildData} />}
        renderElse={
          <Button variant="contained" color="primary" type="submit">
            {submitText}
          </Button>
        }
      />
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
