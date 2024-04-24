import React from "react"
import { AutocompleteField } from "iq-blueberry"
import useBRCityWidget from "./hook"
import getTooltipConfig from "../../helpers/getTooltipConfig"

export default function BRCityWidget({
  stateFieldSlug,
  stateFormat,
  modifyPayloadKeys,
  payload,
  hasError,
  errorMessage,
  label,
  onBlur,
  onChange,
  placeholder,
  slug,
  value,
  isOptional,
  isRequired,
  meta,
}) {
  const { options, isLoading } = useBRCityWidget({
    stateFieldSlug,
    stateFormat,
    modifyPayloadKeys,
    payload,
    slug,
  })

  return (
    <AutocompleteField
      required={isRequired}
      optional={isOptional}
      invalid={hasError}
      errorMessage={errorMessage}
      label={label}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      name={`fbt-field-place`}
      value={value}
      isLoading={isLoading}
      suggestionUse="mandatory"
      tooltipConfig={getTooltipConfig(meta)}
      options={options}
    />
  )
}
