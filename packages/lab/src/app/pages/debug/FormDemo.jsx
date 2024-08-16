import DefaultTemplate from "../../components/templates/DefaultTemplate"
import UploadFileTemplate from "../../components/templates/UploadFileTemplate"
import CustomFormTemplate from "../../components/templates/CustomFormTemplate"
import { createFireboltProvider, Wizard } from "@iq-firebolt/client/src"
import transmorphersPropsPresets from "../../constants/transmorphers-props-presets"
import { propsPresets } from "@iq-firebolt/br-addons"

const withFirebolt = createFireboltProvider({
  formAccess: {
    root: "https://dsv-firebolt-api.iq.com.br/",
    formName: "caixa",
  },
  withHistory: true,
  stepQueryParam: "step",
  enforceNewSession: true,
  debug: true,
  addons: { uiPropsPresets: [propsPresets] },
  mockStep: {
    "slug": "address",
    "type": "form",
    "friendlyname": "Endereço",
    "fields": [
      {
        "slug": "zipcode",
        "ui:widget": "CEP",
        "ui:props-preset": "br-cep",
        "ui:props": {
          "sublabel": "CEP *",
          "placeholder": "00000-000",
          "relatedFieldsSlugs": {
            "cityFieldSlug": "city",
            "stateFieldSlug": "state",
            "streetFieldSlug": "street_address",
            "additionalAddressFieldSlug": "additional_info",
            "neighborhoodFieldSlug": "neighborhood",
          },
        },
        "validators": [{ "type": "required" }, { "type": "cep" }],
      },
      {
        "slug": "address_type",
        "ui:widget": "SelectSearch",
        "ui:props": {
          "sublabel": "Tipo de logradouro *",
          "placeholder": "Tipo de logradouro *",
          "options": [
            { "value": "AL", "label": "Alameda" },
            { "value": "A", "label": "Área" },
            { "value": "AV", "label": "Avenida" },
            { "value": "CPO", "label": "Campo" },
            { "value": "CH", "label": "Chácara" },
            { "value": "EST", "label": "Estrada" },
            { "value": "Q", "label": "Quadra" },
            { "value": "RES", "label": "Residencial" },
            { "value": "R", "label": "Rua" },
            { "value": "ST", "label": "Setor" },
            { "value": "TV", "label": "Travessa" },
            { "value": "ACA", "label": "Acampamento" },
            { "value": "BC", "label": "Beco" },
            { "value": "BVD", "label": "Boulevard" },
            { "value": "NUC", "label": "Núcleo" },
            { "value": "Praça", "label": "PC" },
            { "value": "Sítio", "label": "SIT" },
            { "value": "Via", "label": "V" },
          ],
        },
        "validators": [
          {
            "type": "required",
          },
        ],
        "meta": {},
      },
      {
        "slug": "street_address",
        "ui:widget": "Text",
        "ui:props": {
          "sublabel": "Logradouro *",
          "placeholder": "Ex.: Rua das Graças",
          "readonly": true,
        },
        "validators": [{ "type": "required" }],
      },
      {
        "slug": "street_number",
        "ui:widget": "Number",
        "ui:props": { "sublabel": "Número *", "placeholder": "Ex.: 123" },
        "validators": [
          { "type": "required" },
          {
            "type": "numberRange",
            "properties": {
              "minNumber": 0,
              "underPermitedValueMessage": "O valor deve ser maior que 0",
            },
          },
        ],
        "meta": {},
      },
      {
        "slug": "additional_info",
        "ui:widget": "Text",
        "ui:props": {
          "sublabel": "Complemento",
          "placeholder": "Ex.: Apto 25 bl C",
        },
        "meta": {},
      },
      {
        "slug": "neighborhood",
        "ui:widget": "Text",
        "ui:props": {
          "sublabel": "Bairro *",
          "placeholder": "Ex.: Jardins",
          "readonly": true,
        },
        "validators": [{ "type": "required" }],
        "meta": {},
      },
      {
        "slug": "city",
        "ui:widget": "Text",
        "ui:props": {
          "sublabel": "Cidade *",
          "placeholder": "Digite o nome da sua cidade",
          "readonly": true,
        },
        "validators": [
          {
            "type": "required",
          },
          {
            "type": "nonNumeric",
          },
        ],
        "meta": {},
      },
      {
        "slug": "state",
        "ui:widget": "Select",
        "ui:props-preset": "br-states",
        "ui:props": {
          "label": "",
          "sublabel": "Estado *",
          "placeholder": "Estado",
        },
        "validators": [{ "type": "required" }],
        "meta": {},
      },
    ],
  },
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
          console.log({ sentStep, currentStep })
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
