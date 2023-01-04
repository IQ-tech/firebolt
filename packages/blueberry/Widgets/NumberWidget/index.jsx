import React from "react"
import TextWidget from "../TextWidget"

const NumberWidget = (props) => {
  return <TextWidget {...props} htmlType="number" autoComplete="none" />
}

export default NumberWidget
