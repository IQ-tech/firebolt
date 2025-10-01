import DefaultTemplate from "../../components/templates/DefaultTemplate"
import UploadFileTemplate from "../../components/templates/UploadFileTemplate"
import CustomFormTemplate from "../../components/templates/CustomFormTemplate"
import { createFireboltProvider, Wizard } from "@iq-firebolt/client/src"
import transmorphersPropsPresets from "../../constants/transmorphers-props-presets"
import { propsPresets } from "@iq-firebolt/br-addons"

const withFirebolt = createFireboltProvider({
  formAccess: {
    root: "https://dsv-firebolt-api.iq.com.br/",
    formName: "bb-npf",
    apiKey: "KzCy1mVdeHKt6eEPrW16zw5upn8LaeI5",
  },
  withHistory: true,
  stepQueryParam: "passo",
  // enforceNewSession: true,
  debug: true,
  addons: { uiPropsPresets: [propsPresets] },
  // mockStep: {
  //   "slug": "personal_data",
  //   "type": "form",
  //   "friendlyname": "Dados complementares",
  //   "fields": [
  //     {
  //       "slug": "application",
  //       "ui:widget": "hidden",
  //       "ui:props": {},
  //     },
  //     {
  //       "slug": "id_number",
  //       "ui:widget": "Text",
  //       "ui:props": {
  //         "requiredInput": "true",
  //         "label": "Qual seu RG?",
  //         "sublabel": "Número do RG",
  //         "placeholder": "Digite o número do seu RG",
  //       },
  //       "validators": [{ "type": "required" }],
  //       "meta": {},
  //     },
  //     {
  //       "slug": "brazil_id_org",
  //       "ui:widget": "Select",
  //       "ui:props": {
  //         "sublabel": "Órgão Emissor",
  //         "placeholder": "Selecione o Órgão Emissor",
  //         "options": [
  //           {
  //             "value": "SSP",
  //             "label": "SECRETARIA DE SEGURANÇA PUBLICA",
  //           },
  //           {
  //             "value": "DETRAN",
  //             "label": "DEPARTAMENTO ESTADUAL DE TRANSITO",
  //           },
  //           {
  //             "value": "DGPC",
  //             "label": "DIRETORIA GERAL DA POLICIA CIVIL",
  //           },
  //           {
  //             "value": "DIC",
  //             "label": "DIRETORIA DE IDENTIFICACAO CIVIL",
  //           },
  //         ],
  //       },
  //       "ui:props-conditional": [
  //         {
  //           "conditional": "step.brazil_id_issuer === '31'",
  //           "props": {
  //             "options": [
  //               {
  //                 "value": "DETRAN",
  //                 "label": "DEPARTAMENTO ESTADUAL DE TRANSITO",
  //               },
  //               {
  //                 "value": "DNT",
  //                 "label": "DEPARTAMENTO NACIONAL DE TRANSITO",
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //       "validators": [
  //         {
  //           "type": "required",
  //         },
  //       ],
  //       "meta": {},
  //     },
  //     {
  //       "slug": "gender",
  //       "ui:widget": "Radio",
  //       "ui:props": {
  //         "label": "Sexo",
  //         "sublabel": "Selecione",
  //         "options": [
  //           {
  //             "value": "male",
  //             "label": "Masculino"
  //           },
  //           {
  //             "value": "female",
  //             "label": "Feminino"
  //           },
  //           {
  //             "value": "other",
  //             "label": "Outro"
  //           }
  //         ]
  //       },
  //       "validators": [
  //         {
  //           "type": "required"
  //         }
  //       ],
  //       "meta": {}
  //     },
  //     {
  //       "slug": "educational_level",
  //       "ui:widget": "Select",
  //       "ui:props": {
  //         "autocomplete": true,
  //         "label": "Qual seu nível de escolaridade?",
  //         "sublabel": "Nível de Escolaridade",
  //         "placeholder": "Nível de Escolaridade",
  //         "options": [
  //           {
  //             "value": 4,
  //             "label": "Da 5ª a 8ª série incompleta do Ensino Fundamental",
  //           },
  //           {
  //             "value": 5,
  //             "label": "Ensino Fundamental Completo",
  //           },
  //           {
  //             "value": 6,
  //             "label": "Ensino Médio Incompleto",
  //           },
  //           {
  //             "value": 7,
  //             "label": "Ensino Médio Completo",
  //           },
  //         ],
  //       },
  //       "validators": [
  //         {
  //           "type": "required",
  //         },
  //         {
  //           "type": "onlyValidOption",
  //           "properties": {"options": "prop-value:options"},
  //         }
  //       ],
  //       "meta": {},
  //     },
  //     {
  //       "slug": "profession_group",
  //       "ui:widget": "Select",
  //       "ui:props": {
  //         "autocomplete": true,
  //         "label": "Qual sua profissão?",
  //         "sublabel": "Profissão",
  //         "placeholder": "Digite ou selecione...",
  //         "options": [
  //           { "label": "ACOUGUEIRO", "value": 187689 },
  //           { "label": "ACUPUNTURISTA", "value": 72980821 },
  //           { "label": "ADESTRADOR DE ANIMAIS", "value": 72981095 },
  //           { "label": "ADMINISTRADOR", "value": 125 },
  //           { "label": "ADVOGADO", "value": 131 },
  //           { "label": "AFIADOR", "value": 72981142 },
  //           { "label": "AGENCIADOR DE PROPAGANDA", "value": 405 },
  //           { "label": "AGENTE ADMINISTRATIVO", "value": 292 },
  //           { "label": "AGENTE DE VIAGEM E GUIA DE TURISMO", "value": 594 },
  //           { "label": "AGRICULTOR", "value": 187690 },
  //           { "label": "AGRONOMO", "value": 103 },
  //           { "label": "ALAMBIQUEIRO", "value": 72981148 },
  //           { "label": "ALFAIATE", "value": 591 },
  //           { "label": "ANALISTA DE SISTEMA", "value": 547893 },
  //           { "label": "ANALISTA DE SISTEMAS", "value": 126 },
  //           { "label": "ARQUITETO", "value": 102 },
  //           { "label": "ARRENDATARIO", "value": 950 },
  //           { "label": "ARTISTA DE CIRCO", "value": 72981171 },
  //           { "label": "ARTISTA DE DANCA", "value": 594629 },
  //           { "label": "ARTISTA VISUAL", "value": 187694 },
  //           { "label": "ASSISTENTE SOCIAL", "value": 134 },
  //           { "label": "ASTROLOGO E NUMEROLOGO", "value": 72981178 },
  //           { "label": "ASTRONOMO E METEOROLOGISTA", "value": 128 },
  //           { "label": "ATIVIDADES RELIGIOSAS", "value": 2885158 },
  //           { "label": "ATLETA", "value": 72981183 },
  //           { "label": "ATOR", "value": 594534 },
  //           { "label": "AUXILIAR DE LABORATORIO", "value": 596 },
  //           { "label": "AUXILIAR GERAL", "value": 187698 },
  //           { "label": "BABA", "value": 187699 },
  //           { "label": "BANCARIO E ECONOMIARIO", "value": 395 },
  //           { "label": "BARBEIRO", "value": 187702 },
  //           { "label": "BIOLOGO", "value": 72981223 },
  //           { "label": "SECURITARIO", "value": 396 },
  //           { "label": "SEM OCUPACAO", "value": 995 },
  //           { "label": "SERRALHEIRO", "value": 187788 },
  //           { "label": "SERVENTE", "value": 187789 },
  //           { "label": "SERVENTUARIO DE JUSTICA", "value": 293 },
  //           { "label": "SERVICOS GERAIS", "value": 187791 },
  //           { "label": "TABELIAO", "value": 294 },
  //           { "label": "TAXISTA", "value": 187792 },
  //           { "label": "TECNICO DE BIOLOGIA", "value": 152 },
  //         ],
  //       },
  //       "validators": [{ "type": "required" }],
  //     },
  //     {
  //       "slug": "profession_date",
  //       "ui:widget": "Text",
  //       "ui:props-preset": "day-month-year",
  //       "ui:props": {
  //         "requiredInput": "true",
  //         "sublabel": "Data de início da profissão",
  //         "placeholder": "Ex: 01/12/2009",
  //       },
  //       "validators": [
  //         {
  //           "type": "required",
  //         },
  //         {
  //           "type": "date",
  //         },
  //       ],
  //       "meta": {},
  //     },
  //     {
  //       "slug": "functions",
  //       "ui:widget": "TextArea",
  //       "ui:props": {
  //         "isRequired": "true",
  //         "sublabel": "Descreva suas funções",
  //         "placeholder": "Digite...",
  //         "maxLength": 100,
  //       },
  //       "validators": [{ "type": "required" }],
  //       "meta": {},
  //     },
  //     {
  //       "slug": "responsability_check",
  //       "ui:widget": "Check",
  //       "ui:props": {
  //         "label":
  //           "Declaro que nasci no Brasil; que possuo domicílio fiscal somente no Brasil; que sou responsável pelos meus atos; que NÃO sou Pessoa Politicamente Exposta.",
  //       },
  //       "validators": [
  //         {
  //           "type": "requiredboolean",
  //         },
  //       ],
  //       "meta": {},
  //     },
  //     {
  //       "slug": "authorization_check",
  //       "ui:widget": "Check",
  //       "ui:props": {
  //         "label":
  //           "Autorizo a consulta SCR/BACEN e autorizo o compartilhamento dos meus dados cadastrais.",
  //       },
  //       "validators": [
  //         {
  //           "type": "requiredboolean",
  //         },
  //       ],
  //       "meta": {},
  //     },
  //   ],
  // },
})

const FormDemo = () => {
  return (
    <div>
      <Wizard
        fallback={<p>Carregando....</p>}
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
          // console.log({ sentStep, currentStep })
          // console.log("changed step:", { sentStep, currentStep });
        }}
        onBeforeProceed={(currentStep, formPayload) => {
          // console.log(currentStep, formPayload)
        }}
      >
        <Wizard.Step match="*" component={DefaultTemplate} />
        {/* <Wizard.Step
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
        /> */}
      </Wizard>
    </div>
  )
}

export default withFirebolt(FormDemo)
