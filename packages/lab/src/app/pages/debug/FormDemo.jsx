import DefaultTemplate from "../../components/templates/DefaultTemplate";
import CustomFormTemplate from "../../components/templates/CustomFormTemplate";
import { createFireboltProvider, Wizard } from "@iq-firebolt/client/src";

const withFirebolt = createFireboltProvider({
  formAccess: {
    root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev",
    formName: "bradesco",
  },
  withHistory: true,
  stepQueryParam: "step",
  debug: true,
});

const FormDemo = () => {
  return (
    <div>
      <Wizard
        fallback={<p>my loader  <p style={{ fontSize: "100px" }}>&#129300;</p></p>}
        onFinishForm={(payload) => {
          // console.log("finish form:", payload);
        }}
        onConnectionError={(err) => {
          // console.log("connection error:", err);
        }}
        onBeforeChangeStep={(proceed, { leavingStep, enteringStep }) => {
          // console.log("before change:", { leavingStep, enteringStep });
          proceed();
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
  );
};

export default withFirebolt(FormDemo);
