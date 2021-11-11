import DefaultTemplate from "../../components/templates/DefaultTemplate";
import CustomFormTemplate from "../../components/templates/CustomFormTemplate";
import { createFireboltProvider, Wizard } from "@iq-firebolt/client/src";

const withFirebolt = createFireboltProvider({
  formAccess: {
    root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev",
    formName: "iti-crediario",
  },
  withHistory: true,
  stepQueryParam: "step",
  debug: true,
});

const FormDemo = () => {
  return (
    <div>
      <Wizard
        fallback={<p>my loader</p>}
        onFinishForm={(data) => {
          console.log("finish form");
          console.log(data);
        }}
        onConnectionError={(err) => {
          console.log("connection error");
          console.log(err);
        }}
        onBeforeChangeStep={(proceed, { leavingStep, previousStep }) => {
          console.log("before change step");
          console.log({ leavingStep, previousStep });
        }}
        onChangeStep={(change) => {
          console.log("change step");
          console.log(change);
        }}
      >
        <Wizard.Step match="*" component={DefaultTemplate} />
        <Wizard.Step
          match={{ slug: "personal_data" }}
          component={CustomFormTemplate}
        />
      </Wizard>
    </div>
  );
};

export default withFirebolt(FormDemo);
