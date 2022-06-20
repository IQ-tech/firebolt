import { useEffect } from "react"

export default function useFieldsEvents({
  formPayload,
  onChange,
  onSubmit,
  isFormValid,
  hasFormChanged,
  markAllInvalidFields,
  onGoBack,
  requiredFieldsSlugs,
}) {
  useEffect(() => {
    if (!!onChange && hasFormChanged) {
      onChange(formPayload)
    }
  }, [formPayload, onChange])

  useEffect(() => {
    const isAllRequiredFieldsFilled = requiredFieldsSlugs.every(
      (item) => !!formPayload[item]
    )

    if (isAllRequiredFieldsFilled && requiredFieldsSlugs.length)
      markAllInvalidFields()
  }, [formPayload])

  function handleSubmit(e: { preventDefault: () => void }) {
    if (e && e?.preventDefault) e?.preventDefault()
    if (!!onSubmit && isFormValid) {
      onSubmit(formPayload)
    }

    if (!isFormValid) {
      markAllInvalidFields()
    }
  }

  function handleGoBack(e: { preventDefault: () => void }) {
    e?.preventDefault()
    if (!!onGoBack) {
      onGoBack(formPayload)
    }
  }

  return {
    handleSubmit,
    handleGoBack,
  }
}
