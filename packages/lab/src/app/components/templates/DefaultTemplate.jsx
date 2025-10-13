import { useEffect } from "react"
import { StepForm, FireboltForm, useFirebolt } from "@iq-firebolt/client/src"
// import Theme from "@iq-firebolt/blueberry-theme"
import { CheckboxGroup } from "iq-blueberry"
/* import Theme from "@iq-firebolt/material-theme" */
// import Theme from "../../../../../atlas-theme/index"

import Theme from "../../../../../aurora-theme/index"

const mockFields = [
  {
    "slug": "full_name",
    "ui:widget": "Text",
    "ui:props": {
      "label": "Nome completo",
      "placeholder": "Nome completo",
    },
    "validators": [{ "type": "required" }],
    "meta": {},
  },
  {
    "slug": "name",
    "ui:widget": "Text",
    "ui:props": {
      "label": "Nome completo",
      "placeholder": "Nome completo",
    },
    "validators": [{ "type": "required" }, { "type": "name" }],
    "meta": {},
  },
  {
    "slug": "cpf",
    "ui:widget": "Text",
    "ui:props": {
      "label": "teste",
      "mask": [
        "/\\d/",
        "/\\d/",
        "/\\d/",
        ".",
        "/\\d/",
        "/\\d/",
        "/\\d/",
        ".",
        "/\\d/",
        "/\\d/",
        "/\\d/",
        "-",
        "/\\d/",
        "/\\d/",
      ],
    },
    "ui:styles": {
      "size": "half",
    },
    "validators": [{ "type": "required" }, { "type": "cpf" }],
    "meta": {},
  },
  {
    "slug": "hehe",
    "ui:widget": "Check",
    "ui:props": {
      "label": "Email",
      "placeholder": "contato@email.com",
    },
    "validators": [{ "type": "required" }],
    "meta": {},
  },
]

const DefaultTemplate = ({ fireboltStep }) => {
  return (
    <div className="tooltip-wrapper">
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p>{fireboltStep?.friendlyName}</p>
        <br />
        <StepForm
          theme={Theme}
          onSubmit={(payload) => fireboltStep.goNextStep(payload)}
          onGoBack={fireboltStep.goPreviousStep}
        ></StepForm>
      </div>
    </div>
  )
}

export default DefaultTemplate
