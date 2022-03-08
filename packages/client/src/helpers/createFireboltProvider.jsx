import React from "react"
import FireboltProvider from "../components/FireboltProvider";

const createFireboltProvider =
  ({ formAccess, debug, stepQueryParam, requestsMetadata, withHistory, addons, firstStepPreRender }) =>
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
        firstStepPreRender={firstStepPreRender}
      >
        <Component {...props} />
      </FireboltProvider>
    );

export default createFireboltProvider;
