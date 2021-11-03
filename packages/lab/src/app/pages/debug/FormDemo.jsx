import { createFireboltProvider, Wizard } from "@iq-firebolt/client/src";
import DefaultTemplate from "../../components/templates/DefaultTemplate";

const withFirebolt = createFireboltProvider({
  source: {
    root: "https://dsv-firebolt-api.iq.com.br/",
    formName: "sample",
  },
  debug: true,
  stepQueryParam: "passo",
});

const FormDemo = () => {
  return (
    <div>
    {/*   <Wizard fallback={() => <p>loading</p>}>
        <Wizard.Step match="*" component={DefaultTemplate} />
      </Wizard> */}
    </div>
  );
};

export default withFirebolt(FormDemo);
