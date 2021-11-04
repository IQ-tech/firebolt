import { FireboltForm } from "@iq-firebolt/client/src";

const DefaultTemplate = ({ fireboltStep }) => {
  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p>asdf</p>
        <FireboltForm
          schema={fireboltStep?.fields}
          remoteErrors={fireboltStep?.validationErrors}
          onSubmit={fireboltStep.goNextStep}
        />
      </div>
    </div>
  );
};

export default DefaultTemplate;
