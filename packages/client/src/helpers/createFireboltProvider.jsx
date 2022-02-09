import React from "react"
import FireboltProvider from "../components/FireboltProvider";

const createFireboltProvider =
  ({ formAccess, debug, stepQueryParam, requestsMetadata, withHistory }) =>
  (Component) =>
  (props) =>
    (
      <FireboltProvider
        formAccess={formAccess}
        debug={debug}
        stepQueryParam={stepQueryParam}
        requestsMetadata={requestsMetadata}
        withHistory={withHistory}
      >
        <Component {...props} />
      </FireboltProvider>
    );

export default createFireboltProvider;
