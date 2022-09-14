import React from "react"
import evaluate from "simple-evaluate";
import classnames from "classnames";

import getFieldComponent from "./helpers/getFieldComponent";
import remapFormChildren from "./helpers/remapFormChildren";
import getConditionalProps from "./helpers/getConditionalProps";

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
  classes,
  orderFields,
}) {

  const schemaOrdered = !!orderFields 
    ? orderFields.map(slug => schema.find((field) => field.slug === slug))
    : schema

  // get correct widgets components
  const fieldsChildren = schemaOrdered.map((field = {}, index) => {
    const {
      slug,
      meta = {},
      conditional,
      "ui:widget": widgetName,
      "ui:props": propsFromSchema = {},
      "ui:styles": propsStyles = {},
      "ui:props-conditional": propsConditional,
    } = field;

    const computedClasses = classnames(classes["firebolt-input"], {
      [classes["firebolt-input--half"]]: propsStyles.size === "half",
    });

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
      ...propsFromSchema,
      ...fieldsPropsConditional,
      ...commonFieldsProps,
    };

    if (!shouldHideField) {
      return (
        <div
          className={computedClasses}
          key={`form-item-${index}`}
          data-fieldslug={slug}
        >
          <FieldComponent {...componentProps} />
        </div>
      );
    }
  });

  // join field widgets with form inserts
  const formChildren = remapFormChildren({
    fieldsChildren,
    insertsChildren,
  });

  return { formChildren };
}
