import evaluate from "simple-evaluate";
import getFieldComponent from "./helpers/getFieldComponent";
import remapFormChildren from "./helpers/remapFormChildren";
import getConditionalProps from "./helpers/getConditionalProps";
import { uiPropsPresets } from "@iq-firebolt/client-core";

export default function useFormRendering({
  schema,
  theme,
  children: insertsChildren,
  formPayload,
  modifyPayloadKeys,
  getFieldEvent,
  fieldValidationErrors,
  fieldManuallySetErrors,
  setFieldWarning,
  clearFieldWarning,
}) {
  const fieldsChildren = schema.map((field = {}, index) => {
    const {
      slug,
      meta = {},
      conditional,
      "ui:widget": widgetName,
      "ui:props-preset": propsPresetName,
      "ui:props": propsFromSchema = {},
      "ui:props-conditional": propsConditional,
    } = field;

    const safeTheme = theme || {};
    const hasConditionalRender = !!conditional;
    const isConditionallyValid = hasConditionalRender
      ? evaluate({ step: formPayload }, conditional)
      : true;
    const shouldHideField = widgetName === "hidden" || !isConditionallyValid;
    const fieldId = `firebolt-form-field-${slug}`;
    const fieldValidators = field?.validators || [];
    const isRequiredField = !!fieldValidators.find(
      (validator) => validator?.type === "required"
    );
    const isOptionalField = !isRequiredField;
    const value = formPayload[slug] || "";
    const hasError =
      Object.keys(fieldValidationErrors).includes(slug) ||
      Object.keys(fieldManuallySetErrors).includes(slug);
    const errorMessage =
      fieldValidationErrors?.[slug] ||
      fieldManuallySetErrors?.[slug] ||
      "Campo inválido";

    const FieldComponent = getFieldComponent({
      widgetName,
      customTheme: safeTheme,
    });
    const fieldPropsPreset = uiPropsPresets[propsPresetName];
    const fieldsPropsConditional = getConditionalProps({
      formPayload,
      propsConditional,
    });

    // all fields receives this props by default
    const commonFieldsProps = {
      isRequired: isRequiredField,
      isOptional: isOptionalField,
      payload: formPayload,
      slug,
      errorMessage,
      isValid: !hasError,
      hasError,
      onChange: getFieldEvent.onChange(field),
      onBlur: getFieldEvent.onBlur(field),
      onFocus: getFieldEvent.onFocus(field),
      modifyPayloadKeys,
      value,
      fieldValidators,
      meta,
      fieldId,
      manuallySetFieldError: (message) => setFieldWarning(slug, message, true),
      clearManuallySetError: () => clearFieldWarning(slug, true),
    };

    const componentProps = {
      ...fieldPropsPreset,
      ...propsFromSchema,
      ...fieldsPropsConditional,
      ...commonFieldsProps,
    };

    if (!shouldHideField) {
      return <FieldComponent key={`form-item-${index}`} {...componentProps} />;
    }
  });

  const formChildren = remapFormChildren({
    fieldsChildren,
    insertsChildren,
  });

  return { formChildren };
}
