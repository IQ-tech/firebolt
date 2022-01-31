import { validate } from "@iq-firebolt/validators"
import { useEffect } from "react"
import getAddress from "../services/getAdress"

export default function useCEPWidget({
  relatedFieldsSlugs,
  modifyPayloadKeys,
  value,
  stateFormat,
  manuallySetFieldError,
  clearManuallySetError,
  payload,
}) {
  const [autocompletePayload, setAutoCompletePayload] = useState()
  useEffect(onChangeValue, [value])

  useEffect(() => {
    updateFormPayload()
  }, [autocompletePayload])

  function onChangeValue() {
    const { isValid } = validate("cep", value)
    if (!!value && isValid) {
      _getAddressData(value)
    }
  }

  function updateFormPayload() {
    modifyPayloadKeys({
      ...payload,
      ...autocompletePayload,
    })
  }

  async function _getAddressData(value) {
    const { logradouro, uf, bairro, localidade } = await getAddress(
      value,
      stateFormat
    )

    const hasReturns = !!uf && !!localidade

    if (!hasReturns) {
      manuallySetFieldError("CEP Inválido")
    } else {
      clearManuallySetError()
    }
    const hasRelatedFields =
      !!relatedFieldsSlugs?.cityFieldSlug &&
      !!relatedFieldsSlugs?.stateFieldSlug &&
      !!relatedFieldsSlugs?.streetFieldSlug &&
      !!relatedFieldsSlugs?.neighborhoodFieldSlug

    if (hasRelatedFields && hasReturns) {
      setAutoCompletePayload({
        [relatedFieldsSlugs?.cityFieldSlug]: localidade,
        [relatedFieldsSlugs?.streetFieldSlug]: `${logradouro}`,
        [relatedFieldsSlugs?.stateFieldSlug]: uf,
        [relatedFieldsSlugs?.neighborhoodFieldSlug]: bairro,
      })
    }
  }
}