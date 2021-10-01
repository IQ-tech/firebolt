import { useEffect } from "react";
/* import { createFireboltProvider } from "@iq-firebolt/client/src/index"; */
import { createFireboltProvider } from "@iq-firebolt/client";

import "./App.css";

const withFirebolt = createFireboltProvider({
  source: {
    root: "https://dsv-firebolt-api.iq.com.br/",
    formName: "simplic",
  },
  debug: true,
  stepQueryParam: "passo",
});

function App() {
  useEffect(() => {
    console.log(createFireboltProvider);
  }, []);
  return (
    <div className="App">
      <p>cebola</p>
    </div>
  );
}

export default withFirebolt(App);
