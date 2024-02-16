import React from "react"

import useCurrencyWidget from "../../hooks/useCurrencyWidget"
import TextWidget from "../TextWidget"

const CurrencyWidget = (props) => {
  const { value, onChange } = props
  const { moneyMask, fieldValue } = useCurrencyWidget({value, onChange})

  return <TextWidget {...props} onChange={moneyMask} value={fieldValue} />
}

export default CurrencyWidget
