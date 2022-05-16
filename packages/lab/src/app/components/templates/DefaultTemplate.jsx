import { StepForm, FireboltForm } from "@iq-firebolt/client/src"
import Theme from "@iq-firebolt/blueberry-theme"
import { CheckboxGroup } from "iq-blueberry"
/* import Theme from "@iq-firebolt/material-theme" */

const mockFields = [
  {
    slug: "name",
    "ui:widget": "Text",
    "ui:props": {
      label: "Nome completo",
      placeholder: "Nome completo",
    },
    "ui:styles": {
      size: "half",
    },
    validators: [{ type: "required" }, { type: "name" }],
    meta: {},
  },
  {
    slug: "cpf",
    "ui:widget": "Text",
    "ui:props-preset": "br-cpf",
    "ui:props": {},
    validators: [{ "type": "required" }, { "type": "cpf" }],
    meta: {},
  },
  {
    slug: "income",
    "ui:props-preset": "br-currency",
    "ui:widget": "Text",
    "ui:props": {
      label: "Renda Principal",
    },
    validators: [{ "type": "required" }],
  },
  {
    slug: "phone",
    "ui:widget": "Text",
    "ui:props-preset": "br-phone",
    "ui:props": {
      label: "Celular com DDD",
    },
    validators: [{ "type": "required" }, { "type": "phone" }],
    meta: {},
  },
  {
    slug: "email",
    "ui:widget": "Email",
    "ui:props": {
      label: "Email",
      placeholder: "contato@email.com",
    },
    "ui:styles": {
      size: "full",
    },
    validators: [{ type: "required" }, { type: "email" }],
    meta: {},
  },
  {
    "slug": "emergencial_limit_check",
    "ui:widget": "CheckboxGroup",
    "ui:props": {
      "label": "Limite emergencial",
      "columns": 1,
      "options": [
        {
          "label":
            "Permite avaliação emergencial para aprovação de transações acima do limite.",
        },
      ],
    },
    "meta": {
      "tooltip_text":
        "Para a sua comodidade, o Banco PAN oferece o serviço de Avaliação Emergencial de Crédito. Com este serviço, caso você realize compras acima do limite definido do seu cartão, o Banco PAN irá avaliar a aprovação dessas compras. Somente haverá cobrança de tarifa no valor de R$18,90 no mês em que o serviço for utilizado. Caso você opte por não contratar o serviço, eventuais transações que ultrapassem o limite do seu cartão não serão analisadas e consequentemente recusadas.",
    },
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
    "meta": {
      "tooltip_text":
        "Popularmente, o termo negativado significa “ter o nome sujo”. Está negativado(a) quem tem uma dívida em atraso e com o nome registrado em um órgão de proteção de crédito.",
      "tooltip_container": ".tooltip-wrapper",
    },
  },
]

const DefaultTemplate = ({ fireboltStep }) => {
  return (
    <div className="tooltip-wrapper">
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p>{fireboltStep?.friendlyName}</p>
        <StepForm
          theme={Theme}
          /* schema={mockFields} */
          onFocusField={(field) => {
            // console.log(field)
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
        >
          <StepForm.Insert after={"last"} render={<p>insert</p>} />
        </StepForm>
        <h1>second demo</h1>
        <FireboltForm
          theme={Theme}
          addons={{
            uiPropsPresets: [
              {
                name: "preset-a",
                presets: {
                  "common-item": {
                    label: "cebola",
                    placeholder: "cenoura",
                  },
                },
              },
            ],
          }}
          schema={[
            {
              slug: "test_field",
              "ui:widget": "Text",
              "ui:props-preset": "common-item",
            },
          ]}
        />
      </div>
    </div>
  )
}

export default DefaultTemplate
