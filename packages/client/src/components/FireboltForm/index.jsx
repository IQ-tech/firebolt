import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import Insert from "./Insert";

import useFireboltForm from "./hook";

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
    });

  const ActionsChild = customActionsChild;

  return (
    <form className={className} onSubmit={handleSubmit} autoComplete="off">
      {formChildren}
      {!!customActionsChild ? (
        <ActionsChild formData={actionsChildData} />
      ) : (
        <>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: "5px" }}
            onClick={handleGoBack}
          >
            {previousBtnText}
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {submitBtnText}
          </Button>
        </>
      )}
    </form>
  );
};

FireboltForm.Insert = Insert;

FireboltForm.propTypes = {
  /** Children to be rendered instead of default submit button */
  submitText: PropTypes.string,
  /** Object to autofill form payload */
  autoFill: PropTypes.object,
  /** fields adapter - allow firebolt to use custom components to firebolt base fields */
  theme: PropTypes.object,
};

export default FireboltForm;
