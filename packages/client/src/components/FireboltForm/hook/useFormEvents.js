import { useEffect } from "react";
import { validateFBTField } from "@iq-firebolt/validators";

export default function useFieldsEvents({
  formPayload,
  onChange,
  onSubmit,
  modifyPayloadKeys,
  isFormValid,
  hasFormChanged,
  setHasFormChanged,
  setFieldWarning,
  clearFieldWarning,
  markAllInvalidFields,
}) {
  useEffect(() => {
    if (!!onChange && hasFormChanged) {
      onChange(formPayload);
    }
  }, [formPayload, onChange]);

  function validateField(field, value) {
    return validateFBTField({
      value,
      field,
      formPayload,
      context: "client",
    });
  }

  function getOnFieldBlur(field) {
    const fieldSlug = field?.slug;
    return (value) => {
      const fieldValidation = validateField(field, value);
      const isValueValid = fieldValidation.isValid;

      if (isValueValid) {
        clearFieldWarning(fieldSlug);
      } else {
        const errorMessage = fieldValidation?.invalidValidations[0]?.message;
        setFieldWarning(fieldSlug, errorMessage);
      }
    };
  }

  function getOnFieldChange(field) {
    const fieldSlug = field?.slug;
    return (value) => {
      const isValueValid = validateField(field, value).isValid;
      if (!hasFormChanged) setHasFormChanged(true);
      modifyPayloadKeys({ [fieldSlug]: value });
      if (isValueValid) {
        clearFieldWarning(fieldSlug);
      }
    };
  }

  function getOnFieldFocus(field) {
    return (value) => console.log(value);
  }

  function handleSubmit(e) {
    if (e && e?.preventDefault) e?.preventDefault();
    if (!!onSubmit && isFormValid) {
      onSubmit(formPayload);
    }

    if (!isFormValid) {
      markAllInvalidFields();
    }
  }

  return {
    handleSubmit,
    getFieldEvent: {
      onBlur: getOnFieldBlur,
      onChange: getOnFieldChange,
      onFocus: getOnFieldFocus,
    },
  };
}
