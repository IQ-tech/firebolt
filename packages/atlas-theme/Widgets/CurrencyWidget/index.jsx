import React from "react"

import TextWidget from "../TextWidget"
import useCurrencyWidget from "../../hooks/useCurrencyWidget"

const CurrencyWidget = (props) => {
  const { value, onChange } = props
  const { moneyMask, fieldValue } = useCurrencyWidget({value, onChange})

  return <TextWidget {...props} onChange={moneyMask} value={fieldValue} />
}

export default CurrencyWidget
