import { FireboltForm } from "@iq-firebolt/client/src";

const DefaultTemplate = ({ fireboltStep }) => {
  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p>My custom form template</p>
        <FireboltForm
          schema={fireboltStep?.fields}
          remoteErrors={fireboltStep?.validationErrors}
          onSubmit={fireboltStep.goNextStep}
          onGoBack={fireboltStep.goPreviousStep}
        />
      </div>
    </div>
  );
};

export default DefaultTemplate;
