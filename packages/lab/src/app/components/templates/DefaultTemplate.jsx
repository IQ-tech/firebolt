import { FireboltForm, StepForm } from "@iq-firebolt/client/src"

const DefaultTemplate = ({ fireboltStep }) => {
  const fields = [
    {
      slug: "university_student_check",
      "ui:widget": "Check",
      "ui:props": {
        label: "Sou universitário",
      },
    },
    {
      slug: "university_name",
      "ui:widget": "Select",
      conditional: "step.university_student_check === true",
      "ui:props": {
        label: "Nome da instituição",
        options: [
          {
            value: "00490",
            label: "Uvv - Universidade Vila Velha",
          },
          {
            value: "01704",
            label: "Vertice - Faculdade Vertice",
          },
          {
            value: "01796",
            label: "Vizivali - Faculdade Vizinhanca Vale Do Iguacu",
          },
        ],
      },
      validators: [{ type: "required" }],
    },
    {
      slug: "university_name_course",
      "ui:widget": "Select",
      conditional: "step.university_student_check === true",
      "ui:props": {
        label: "Nome do curso",
        options: [
          {
            value: "00125",
            label: "Terapia Ocupacional",
          },
          {
            value: "00672",
            label: "Turismo",
          },
          {
            value: "00172",
            label: "Zootecnia",
          },
        ],
      },
      validators: [{ type: "required" }],
    },
    {
      slug: "profession_group",
      "ui:widget": "Select",
      "ui:props": {
        label: "Profissão",
        options: [
          {
            value: "4020",
            label: "Vendedor Pracista",
          },
          {
            value: "9980-1",
            label: "Outros",
          },
        ],
      },
      validators: [{ type: "required" }],
    },
    {
      slug: "monthly_income",
      "ui:widget": "Text",
      "ui:props-preset": "br-currency",
      "ui:props": {
        label: "Renda mensal",
      },
      validators: [{ type: "required" }],
      meta: {},
    },
  ]

  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p>{fireboltStep?.friendlyName}</p>

        <StepForm
          schema={fields}
          onFocusField={(field) => {
            console.log(field)
          }}
          customActionsChild={({ formData }) => {
            return formData.isFormValid ? (
              <button>next liberado</button>
            ) : (
              <button>next bloqueado</button>
            )
          }}
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
