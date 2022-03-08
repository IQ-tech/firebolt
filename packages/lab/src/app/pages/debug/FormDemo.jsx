import DefaultTemplate from "../../components/templates/DefaultTemplate"
import CustomFormTemplate from "../../components/templates/CustomFormTemplate"
import { createFireboltProvider, Wizard } from "@iq-firebolt/client/src"
import transmorphersPropsPresets from "../../constants/transmorphers-props-presets"
import { propsPresets } from "@iq-firebolt/br-addons"

const mockJSONPrerender =
  {
    "auth": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfaWQiOiI4ZGE3Njk0NS04M2E3LTQ5M2EtOTI4NS02MzM2ZjAxM2I0NDUiLCJpYXQiOjE2NDU2NDkzMDZ9.rFHuWzlj9mtaQpcy6jUA5hoC82qnJ6BpJWJZnviDfXo",
    "meta": {
      "lastStep": "bills",
      "forms": [
        {
          "position": 1,
          "slug": "personal_data",
          "friendlyname": "Vamos começar"
        },
        {
          "position": 2,
          "slug": "documents",
          "friendlyname": "Documentos"
        },
        {
          "position": 3,
          "slug": "address",
          "friendlyname": "Endereço"
        },
        {
          "position": 4,
          "slug": "bills",
          "friendlyname": "Adicionar Contas"
        }
      ]
    },
    "capturedData": {},
    "step": {
      "data": {
        "id": 1,
        "slug": "personal_data",
        "type": "form",
        "friendlyName": "Vamos começar mock",
        "fields": [
          {
            "slug": "full_name",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Nome completo",
              "placeholder": "Nome completo"
            },
            "validators": [
              {
                "type": "required"
              },
              {
                "type": "name"
              }
            ],
            "meta": {}
          },
          {
            "slug": "email",
            "ui:widget": "Email",
            "ui:props": {
              "label": "Email",
              "placeholder": "contato@email.com"
            },
            "validators": [
              {
                "type": "required"
              }
            ],
            "meta": {}
          }
        ]
      },
      "position": 1
    }
  }


const withFirebolt = createFireboltProvider({
  formAccess: {
    root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev",
    formName: "sample",
  },
  withHistory: true,
  stepQueryParam: "step",
  debug: true,
  addons: {
    uiPropsPresets: [propsPresets],
  },
  firstStepPreRender: mockJSONPrerender
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
          // console.log("changed step:", { sentStep, currentStep });
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
