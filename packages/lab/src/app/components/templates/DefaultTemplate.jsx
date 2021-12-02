import { FireboltForm } from "@iq-firebolt/client/src";

const DefaultTemplate = ({ fireboltStep }) => {
  const fields = [
    {
      slug: "full_name",
      "ui:widget": "Text",
      "ui:props": {
        label: "Nome completoooooo",
        placeholder: "Nome completo",
        size: "half",
      },
      validators: [{ type: "required" }, { type: "name" }],
      meta: {},
    },
    {
      slug: "email",
      "ui:widget": "Email",
      "ui:props": {
        label: "Emaillllll",
        placeholder: "contato@email.com",
        // size: "half",
      },
      validators: [{ type: "required" }, { type: "email" }],
      meta: {},
    },
  ];

  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p>{fireboltStep?.friendlyName}</p>
        <FireboltForm
          submitBtnText="Next Step"
          previousBtnText="Previous step"
          schema={fields}
          remoteErrors={fireboltStep?.remoteErrors}
          onSubmit={(payload) => fireboltStep.goNextStep(payload)}
          onGoBack={fireboltStep.goPreviousStep}
        >
          <FireboltForm.Insert
            after="first"
            render={<h1 className="insertttt">insert aqui</h1>}
          />
        </FireboltForm>
      </div>
    </div>
  );
};

export default DefaultTemplate;
