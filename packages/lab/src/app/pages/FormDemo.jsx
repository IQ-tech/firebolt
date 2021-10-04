import {
  createFireboltProvider,
  FireboltForm,
  Wizard,
} from "@iq-firebolt/client/src";

const withFirebolt = createFireboltProvider({
  source: {
    root: "https://dsv-firebolt-api.iq.com.br/",
    formName: "sample",
  },
  debug: true,
  stepQueryParam: "passo",
});

const Template = ({ fireboltStep }) => {
  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <FireboltForm schema={fireboltStep?.fields} />
      </div>
    </div>
  );
};

const FormDemo = () => {
  return (
    <div>
      <Wizard fallback={() => <p>loading</p>}>
        <Wizard.Step match="*" component={Template} />
      </Wizard>
    </div>
  );
};

export default withFirebolt(FormDemo);
