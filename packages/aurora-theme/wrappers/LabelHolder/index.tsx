import {
  Conditional,
  IconHelpCircle,
  Tooltip,
} from "@consumidor-positivo/aurora"

import "./styles.scss"
import { useState } from "react"

export const LabelHolder = ({ label, tooltipText }) => {
  const [openTooltip, setOpenTooltip] = useState(false)

  function toggleTooltip() {
    setOpenTooltip(!openTooltip)
  }

  return (
    <Conditional
      condition={tooltipText}
      renderIf={
        <div className="label-holder__with-tooltip" onClick={toggleTooltip}>
          {label}{" "}
          <Tooltip text={tooltipText} position="top" open={openTooltip}>
            <IconHelpCircle />
          </Tooltip>
        </div>
      }
      renderElse={label}
    />
  )
}
