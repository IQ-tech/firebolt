import React from "react"
import TextWidget from "../TextWidget"

const NumberWidget = (props) => {
  const { min = "0", max, ...rest } = props

  return <TextWidget {...rest} htmlType="number" min={min} max={max}/>
}

export default NumberWidget
