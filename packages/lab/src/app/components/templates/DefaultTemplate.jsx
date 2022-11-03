import { useEffect } from "react"
import { StepForm, FireboltForm, useFirebolt } from "@iq-firebolt/client/src"
import Theme from "@iq-firebolt/blueberry-theme"
import { CheckboxGroup } from "iq-blueberry"
/* import Theme from "@iq-firebolt/material-theme" */

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
      ]
      

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
  const { remoteErrors } = useFirebolt()
  useEffect(() => {
    console.log(remoteErrors)
  }, [remoteErrors])

  return (
    <div className="tooltip-wrapper">
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p>{fireboltStep?.friendlyName}</p>
        <StepForm
          theme={Theme}
/*           autoFill={{
            "cpf": "01234567890",
            "full_name": "carrot top",
            "email": "teste@teste.com",

          }} */
          /* schema={mockFields} */
/*           onFocusField={(fieldConfig, formPayload) => {
            console.log("focus")
            console.log({ fieldConfig, formPayload })
          }}
          onChangeField={(fieldConfig, value, formPayload) => {
            console.log("change")
            console.log({ fieldConfig, value, formPayload })
          }}
          onBlurField={(fieldConfig, value, formPayload) => {
            console.log("blur")
            console.log({ fieldConfig, value, formPayload })
          }}
          onChange={(test) => {
            console.log(test)
          }} */
          onSubmit={(payload) => fireboltStep.goNextStep(payload)}
          onGoBack={fireboltStep.goPreviousStep}
        /*           customActionsChild={({ formData }) => {
          return formData.isFormValid ? (
            <button>next liberado</button>
          ) : (
            <button>next bloqueado</button>
          )
        }} */
        ></StepForm>
      </div>
    </div>
  )
}

export default DefaultTemplate
