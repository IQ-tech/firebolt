import { useState, useEffect } from "react"

export default function useCurrencyWidget({ value, onChange }) {
  const [fieldValue, setFieldValue] = useState("")

  useEffect(() => {
    moneyMask(value)
  }, [value])

  const moneyMask = (rawValue) => {
    if (rawValue === null) rawValue = ""
    if (typeof rawValue === "number") rawValue += ""
    rawValue = rawValue.replace(/\D/g, "")

    let int = parseInt(rawValue, 10)
    if (isNaN(int)) return ""
    rawValue = int.toString()
    rawValue = rawValue.replace(/(\d)(\d{11})$/, "$1.$2")
    rawValue = rawValue.replace(/(\d)(\d{8})$/, "$1.$2")
    rawValue = rawValue.replace(/(\d)(\d{5})$/, "$1.$2")
    if (int < 10) {
      rawValue = rawValue.replace(/(\d)(\d{0,2})$/, "0,0$1")
    } else if (int < 100) {
      rawValue = rawValue.replace(/(\d)(\d{0,2})$/, "0,$1$2")
    } else {
      rawValue = rawValue.replace(/(\d)(\d{2})$/, "$1,$2")
    }

    const finalValue = rawValue.length === 0 ? "" : "R$ " + rawValue

    onChange(finalValue)
    setFieldValue(finalValue)
  }

  return { moneyMask, fieldValue }
}
