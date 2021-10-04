import { useRef } from "react";
import useMaskedInput from "@viewstools/use-masked-input";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FieldHolder from "../../FieldHolder";

const TextWidget = ({
  // html attributtes
  htmlType = "text",
  value,
  placeholder,
  isRequired,

  // custom props
  slug,
  mask,
  errorMessage,
  hasError,
  label,
  fieldId,

  // events
  onChange,
  onBlur,
}) => {
  const fieldRef = useRef(null);

  const onChangeMask = useMaskedInput({
    input: fieldRef,
    mask: mask ? mask : false,
    onChange: (e) => onChange(e?.target?.value),
  });

  return (
    <FieldHolder my="30px">
      <FormControl fullWidth>
        <TextField
          required={isRequired}
          id={fieldId}
          error={hasError}
          label={label}
          type={htmlType}
          helperText={hasError ? errorMessage : ""}
          name={slug}
          value={value}
          inputRef={fieldRef}
          placeholder={placeholder}
          onChange={onChangeMask}
          onBlur={(e) => onBlur(e?.target?.value)}
          autoComplete="off"
          variant="outlined"
        />
      </FormControl>
    </FieldHolder>
  );
};

export default TextWidget;
