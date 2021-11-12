import { FireboltForm } from "@iq-firebolt/client/src";

const DefaultTemplate = ({ fireboltStep }) => {
  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p>asdf</p>
        <FireboltForm
          submitBtnText="Next Step"
          previousBtnText="Previous step"
          
          schema={fireboltStep?.fields}
          remoteErrors={fireboltStep?.remoteErrors}
          onSubmit={(payload) => fireboltStep.goNextStep(payload)}
          onGoBack={fireboltStep.goPreviousStep}
        />
      </div>
    </div>
  );
};

export default DefaultTemplate;
