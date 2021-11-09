import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import useUploadWidget from "../../../../hooks/widgetsBehavior/useUploadWidget";
import FieldHolder from "../../FieldHolder";

const UploadWidget = ({
  slug,
  fieldId,
  hasError,
  allowedExtensions,
  errorMessage,
  uploadEndpoint,
  maxFiles,
  onBlur,
  onChange,
  label,
  placeholder = "Choose file",
  isRequired,
  ...props
}) => {
  const { inputElRef, accept, multiple, onChangeFileInput, internalError } =
    useUploadWidget({
      maxFiles,
      allowedExtensions,
      uploadEndpoint,
    });

  return (
    <FieldHolder>
      <FormControl required={isRequired} error={hasError} fullWidth>
        <InputLabel
          style={{
            position: "static",
            transform: "none",
            paddingBottom: "10px",
          }}
          htmlFor={fieldId}
        >
          {label}
        </InputLabel>
        <input
          ref={inputElRef}
          id={fieldId}
          name={slug}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={onChangeFileInput}
          style={{ position: "absolute", opacity: "0", visibility: "hidden" }}
        />
        <Button
          variant="contained"
          color="primary"
          tabIndex="0"
          onBlur={onBlur}
          onClick={() => inputElRef?.current?.click()}
        >
          {placeholder}
        </Button>
        {!!hasError && (
          <FormHelperText id={`${fieldId}-error-form`}>
            {errorMessage}
          </FormHelperText>
        )}

        {!!internalError && (
          <FormHelperText error id={`${fieldId}--error-internal`}>
            {internalError}
          </FormHelperText>
        )}
      </FormControl>
    </FieldHolder>
  );
};

export default UploadWidget;
