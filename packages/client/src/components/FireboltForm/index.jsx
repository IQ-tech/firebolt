import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import Insert from "./Insert";

import useFireboltForm from "./hook";

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
    autoFill,
    theme,

    schema,
    remoteErrors,
    onSubmit,
    children,
    onChange,
  });

  const ActionsChild = customActionsChild;

  return (
    <form className={className} onSubmit={handleSubmit} autoComplete="off">
      {formChildren}
      {!!customActionsChild ? (
        <ActionsChild formData={actionsChildData} />
      ) : (
        <Button variant="contained" color="primary" type="submit">
          {submitText}
        </Button>
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
