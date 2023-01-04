import DefaultTemplate from "../../components/templates/DefaultTemplate"
import UploadFileTemplate from "../../components/templates/UploadFileTemplate"
import CustomFormTemplate from "../../components/templates/CustomFormTemplate"
import { createFireboltProvider, Wizard } from "@iq-firebolt/client/src"
import transmorphersPropsPresets from "../../constants/transmorphers-props-presets"
import { propsPresets } from "@iq-firebolt/br-addons"

const withFirebolt = createFireboltProvider({
  formAccess: {
    root: "https://dsv-firebolt-api.iq.com.br/",
    formName: "sample",
  },
  withHistory: true,
  stepQueryParam: "step",
  debug: true,
  addons: { uiPropsPresets: [propsPresets] },
  // mockStep: {
  //   friendlyName: "Cebola",
  //   fields: [
  //     {
  //       slug: "name",
  //       "ui:widget": "Text",
  //       "ui:props": {
  //         label: "Nomes completo",
  //         placeholder: "Nome completo",
  //       },
  //       "ui:styles": {
  //         size: "half",
  //       },
  //       validators: [{ type: "required" }, { type: "name" }],
  //       meta: {},
  //     },
  //     {
  //       slug: "cpf",
  //       "ui:widget": "Text",
  //       "ui:props-preset": "br-cpf",
  //       "ui:props": {},
  //       validators: [{ "type": "required" }, { "type": "cpf" }],
  //       meta: {},
  //     },
  //     {
  //       slug: "income",
  //       "ui:props-preset": "br-currency",
  //       "ui:widget": "Text",
  //       "ui:props": {
  //         label: "Renda Principal",
  //       },
  //       validators: [{ "type": "required" }],
  //     },
  //     {
  //       slug: "phone",
  //       "ui:widget": "Text",
  //       "ui:props-preset": "br-phone",
  //       "ui:props": {
  //         label: "Celular com DDD",
  //       },
  //       validators: [{ "type": "required" }, { "type": "phone" }],
  //       meta: {},
  //     },
  //     {
  //       slug: "email",
  //       "ui:widget": "Email",
  //       "ui:props": {
  //         label: "Email",
  //         placeholder: "contato@email.com",
  //       },
  //       "ui:styles": {
  //         size: "full",
  //       },
  //       validators: [{ type: "required" }, { type: "email" }],
  //       meta: {},
  //     },
  //     {
  //       "slug": "emergencial_limit_check",
  //       "ui:widget": "CheckboxGroup",
  //       "ui:props": {
  //         "label": "Limite emergencial",
  //         "columns": 1,
  //         "options": [
  //           {
  //             "label": "Permite avaliação emergencial para aprovação de transações acima do limite."
  //           }
  //         ]
  //       },
  //       "meta": {
  //         "tooltip_text": "Para a sua comodidade, o Banco PAN oferece o serviço de Avaliação Emergencial de Crédito. Com este serviço, caso você realize compras acima do limite definido do seu cartão, o Banco PAN irá avaliar a aprovação dessas compras. Somente haverá cobrança de tarifa no valor de R$18,90 no mês em que o serviço for utilizado. Caso você opte por não contratar o serviço, eventuais transações que ultrapassem o limite do seu cartão não serão analisadas e consequentemente recusadas."
  //       }
  //     },
  //     {
  //       "slug": "bad_credit",
  //       "ui:widget": "Radio",
  //       "ui:props": {
  //         "label": "Está negativado?",
  //         "options": [
  //           {
  //             "value": "true",
  //             "label": "Sim"
  //           },
  //           {
  //             "value": "false",
  //             "label": "Não"
  //           }
  //         ]
  //       },
  //       "ui:styles": { 
  //         "size":"half"
  //       },
  //       "validators": [{ "type": "required" }],
  //       "meta": {
  //         "tooltip_text": "Popularmente, o termo negativado significa “ter o nome sujo”. Está negativado(a) quem tem uma dívida em atraso e com o nome registrado em um órgão de proteção de crédito.",
  //         "tooltip_container": ".tooltip-wrapper"
  //       }
  //     }
  //   ]
  // }
})

const FormDemo = () => {
  return (
    <div>
      <Wizard
        fallback={
          <p>
            my loader <span style={{ fontSize: "100px" }}>&#129300;</span>
          </p>
        }
        onFinishForm={(payload) => {
          // console.log("finish form:", payload);
        }}
        onConnectionError={(err) => {
          // console.log("connection error:", err);
        }}
        onBeforeChangeStep={(proceed, { leavingStep, enteringStep }) => {
          // console.log("before change:", { leavingStep, enteringStep });
          proceed()
        }}
        onChangeStep={({ sentStep, currentStep }) => {
          console.log({sentStep, currentStep})
          // console.log("changed step:", { sentStep, currentStep });
        }}
        onBeforeProceed={(currentStep, formPayload) => {
          console.log(currentStep, formPayload)
        }}
      >
        <Wizard.Step match="*" component={DefaultTemplate} />
        <Wizard.Step
          match={{ slug: "iqc" }}
          component={({ fireboltStep }) => (
            <button onClick={() => fireboltStep.goNextStep()}> proceed</button>
          )}
        />
        <Wizard.Step
          match={{ slug: "sms_token" }}
          component={({ fireboltStep }) => (
            <button onClick={() => fireboltStep.goNextStep()}>proceed</button>
          )}
        />
        <Wizard.Step
          match={{ slug: "summary" }}
          component={({ fireboltStep }) => (
            <button
              onClick={() =>
                fireboltStep.goNextStep({
                  lead_uuid: "asjhf",
                  simulation_uuid: "Sdfgd",
                  simulation_option_uuid: "sdfdg",
                })
              }
            >
              proceed
            </button>
          )}
        />
      </Wizard>
    </div>
  )
}

export default withFirebolt(FormDemo)
