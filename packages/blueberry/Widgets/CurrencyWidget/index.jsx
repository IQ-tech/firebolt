import React from "react"
import useCurrencyWidget from "../../hooks/useCurrencyWidget"
import TextWidget from "../TextWidget"

const CurrencyWidget = (props) => {
  const { moneyMask, fieldValue } = useCurrencyWidget()

  return <TextWidget {...props} onChange={moneyMask} value={fieldValue} />
}

export default CurrencyWidget
