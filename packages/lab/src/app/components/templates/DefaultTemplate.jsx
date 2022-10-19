import { StepForm, FireboltForm } from "@iq-firebolt/client/src"
import Theme from "@iq-firebolt/blueberry-theme"
import { CheckboxGroup } from "iq-blueberry"
/* import Theme from "@iq-firebolt/material-theme" */

const mockFields = [
  {
    "slug": "choosen_card",
    "ui:widget": "hidden",
    "ui:props": {},
    "validators": [{ "type": "required" }],
  },
  {
    "slug": "full_name",
    "ui:widget": "Text",
    "ui:props": {
      "label": "Nome completo",
      "placeholder": "Nome completo",
    },
    "validators": [{ "type": "required" }, { "type": "name" }],
    "meta": {},
  },
  {
    "slug": "email",
    "ui:widget": "Email",
    "ui:props": {
      "label": "Email",
      "placeholder": "contato@email.com",
    },
    "validators": [{ "type": "required" }, { "type": "email" }],
    "meta": {},
  },
  {
    "slug": "cpf",
    "ui:widget": "Text",
    "ui:props-preset": "br-cpf",
    "ui:props": {},
    "ui:styles": {
      "size": "half",
    },
    "validators": [{ "type": "required" }, { "type": "cpf" }],
    "meta": {},
  },
  {
    "slug": "main_income",
    "ui:widget": "Text",
    "ui:props-preset": "br-currency",
    "ui:props": {
      "label": "Renda mensal",
    },
    "ui:styles": {
      "size": "half",
    },
    "validators": [{ "type": "required" }],
    "meta": {},
  },
  {
    "slug": "main_phone",
    "ui:widget": "Text",
    "ui:props-preset": "br-phone",
    "ui:props": {
      "label": "Celular com DDD",
    },
    "ui:styles": {
      "size": "half",
    },
    "validators": [{ "type": "required" }, { "type": "phone" }],
    "meta": {},
  },
  {
    "slug": "bad_credit",
    "ui:widget": "Radio",
    "ui:props": {
      "label": "Está negativado?",
      "options": [
        {
          "value": "true",
          "label": "Sim",
        },
        {
          "value": "false",
          "label": "Não",
        },
      ],
    },
    "ui:styles": {
      "size": "half",
    },
    "validators": [{ "type": "required" }],
  },
]

const DefaultTemplate = ({ fireboltStep }) => {
  return (
    <div className="tooltip-wrapper">
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p>{fireboltStep?.friendlyName}</p>
        <StepForm
          theme={Theme}
          onFocusField={(field) => {
            // console.log(field)
          }}
          onChange={(test) => {
            console.log(test)
          }}
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
