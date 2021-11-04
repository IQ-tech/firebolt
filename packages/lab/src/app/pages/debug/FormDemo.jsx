/* import { createFireboltProvider, Wizard } from "@iq-firebolt/client/src"; */
import DefaultTemplate from "../../components/templates/DefaultTemplate";
import { createFireboltProvider } from "@iq-firebolt/client/src";

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
      <p>cebola</p>
    </div>
  );
};

export default withFirebolt(FormDemo);
