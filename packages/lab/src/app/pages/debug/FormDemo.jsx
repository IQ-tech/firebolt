import DefaultTemplate from "../../components/templates/DefaultTemplate";
import { createFireboltProvider, Wizard } from "@iq-firebolt/client/src";

const withFirebolt = createFireboltProvider({
  formAccess: {
    root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev",
    formName: "sample",
  },
  withHistory: true,
  stepQueryParam: "passo",
});

const FormDemo = () => {
  return (
    <div>
      <Wizard fallback={<p>my loader</p>}>
        <Wizard.Step match="*" component={DefaultTemplate} />
        {/*       <Wizard.Step
          match={{ slug: "personal_data" }}
          component={() => <p>potato</p>}
        /> */}
      </Wizard>
    </div>
  );
};

export default withFirebolt(FormDemo);
