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
}) {
  useEffect(onChangeValue, [value])

  function onChangeValue() {
    const { isValid } = validate("cep", value)
    if (!!value && isValid) {
      _getAddressData(value)
    }
  }

  async function _getAddressData(value) {
    const { logradouro, uf, bairro, localidade } = await getAddress(
      value,
      stateFormat
    )

    const hasReturns = !!logradouro && !!uf && !!bairro && !!localidade
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
      modifyPayloadKeys({
        [relatedFieldsSlugs?.cityFieldSlug]: localidade,
        [relatedFieldsSlugs?.streetFieldSlug]: `${logradouro}`,
        [relatedFieldsSlugs?.stateFieldSlug]: uf,
        [relatedFieldsSlugs?.neighborhoodFieldSlug]: bairro,
      })
    }
  }
}
