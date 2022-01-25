import { useState, useEffect } from "react"
import stateFormats from "../../constants/state-formats"
import getCities from "../../services/getCities"

export default function useBRCityWidget({
  payload,
  modifyPayloadKeys,
  stateFieldSlug,
  stateFormat = "br",
  slug,
}) {
  const [options, setOptions] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const provinceValue = payload?.[stateFieldSlug]

  useEffect(_handleStateChange, [provinceValue])

  function _handleStateChange() {
    const correctStateKey = Object.keys(stateFormats).find(
      (key) => stateFormats?.[key]?.[stateFormat] === provinceValue
    )
    const correctStateNumber = stateFormats?.[correctStateKey]?.uf

    if (correctStateNumber) {
      setIsloading(true)
      getCities(correctStateNumber).then((res = []) => {
        const formatted = res?.map((item) => ({
          label: item?.nome,
          value: item?.nome,
        }))
        setIsloading(false)
        setOptions(formatted)
      })
    }
  }

  return { options, isLoading }
}
