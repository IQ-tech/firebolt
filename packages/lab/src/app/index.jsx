import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <p>
      my appx <FireboltForm />
    </p>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);
