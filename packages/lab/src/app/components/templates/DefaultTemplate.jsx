import { FireboltForm, StepForm } from "@iq-firebolt/client/src"
import Theme from "@iq-firebolt/blueberry-theme"

const DefaultTemplate = ({ fireboltStep }) => {
  const fields = [
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
      meta: {}
    },
    {
      slug: "income",
      "ui:props-preset": "br-currency",
      "ui:widget": "Text",
      "ui:props": {
        label: "Renda Principal"
      },
      validators: [{ "type": "required" }]
    },
    {
      slug: "phone",
      "ui:widget": "Text",
      "ui:props-preset": "br-phone",
      "ui:props": {
        label: "Celular com DDD"
      },
      validators: [{ "type": "required" }, { "type": "phone" }],
      meta: {}
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
  ];

  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p>{fireboltStep?.friendlyName}</p>
        <StepForm
          theme={Theme}
          schema={fireboltStep.fields}
          onFocusField={(field) => {
            console.log(field)
          }}
          onSubmit={(payload) => fireboltStep.goNextStep(payload)}
          onGoBack={fireboltStep.goPreviousStep}
          // customActionsChild={({ formData }) => {
          //   return formData.isFormValid ? (
          //     <button>next liberado</button>
          //   ) : (
          //     <button>next bloqueado</button>
          //   )
          // }}
        >
          <StepForm.Insert after={"last"} render={<p>insert</p>} />
        </StepForm>
      

        {/* <FireboltForm
          submitBtnText="Next Step"
          previousBtnText="Previous step"
          schema={fields}
          remoteErrors={fireboltStep?.remoteErrors}
          onSubmit={(payload) => fireboltStep.goNextStep(payload)}
          onGoBack={fireboltStep.goPreviousStep}
        >
          <FireboltForm.Insert
            after={{fieldSlug: "full_name"}}
            render={<p>cenoura</p>}
          />
        </FireboltForm> */}
      </div>
    </div>
  )
}

export default DefaultTemplate
