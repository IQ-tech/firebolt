/* import { createFireboltProvider, Wizard } from "@iq-firebolt/client/src"; */
import DefaultTemplate from "../../components/templates/DefaultTemplate";
import FireboltProvider from "@iq-firebolt/client/src/components/nFireboltProvider/index.jsx";

/* const withFirebolt = createFireboltProvider({
  formAccess: {
    root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev",
    formName: "sample",
  },
}); */

const FormDemo = () => {
  return (
    <div>
      <p>cebola</p>
    </div>
  );
};

export default () => (
  <FireboltProvider
    formAccess={{
      root: "https://btti33t5h5.execute-api.sa-east-1.amazonaws.com/dev",
      formName: "sample",
    }}
    withHistory
  >
    <FormDemo />
  </FireboltProvider>
);
