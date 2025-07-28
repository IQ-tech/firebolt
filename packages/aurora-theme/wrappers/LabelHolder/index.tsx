import {
  Conditional,
  IconHelpCircle,
  Tooltip,
} from "@consumidor-positivo/aurora"

import "./styles.scss"

export const LabelHolder = ({ label, tooltipText }) => {
  return (
    <Conditional
      condition={tooltipText}
      renderIf={
        <div className="label-holder__with-tooltip">
          {label}{" "}
          <Tooltip text={tooltipText} position="top">
            <IconHelpCircle />
          </Tooltip>
        </div>
      }
      renderElse={label}
    />
  )
}
