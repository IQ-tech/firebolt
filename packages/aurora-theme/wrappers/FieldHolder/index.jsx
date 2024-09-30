import React from "react"
import { Conditional, Text } from "@consumidor-positivo/aurora"

import "./styles.scss"


const FieldHolder = ({ title, children }) => {
  return (
    <div className="field-holder">
      <Conditional
        condition={!!title}
        renderIf={
          <div className="field-holder__title">
            <Text as="h2" variant="heading-small" weight="bold">
              {title}
            </Text>
          </div>
        }
      />
      {children}
    </div>
  )
}

export default FieldHolder
