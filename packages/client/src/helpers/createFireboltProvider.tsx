import React from "react"
import FireboltProvider from "../components/FireboltProvider";

const createFireboltProvider =
  ({ formAccess, debug, stepQueryParam, requestsMetadata, withHistory, addons }) =>
  (Component) =>
  (props) =>
    (
      <FireboltProvider
        formAccess={formAccess}
        debug={debug}
        stepQueryParam={stepQueryParam}
        requestsMetadata={requestsMetadata}
        withHistory={withHistory}
        addons={addons}
      >
        <Component {...props} />
      </FireboltProvider>
    );

export default createFireboltProvider;
