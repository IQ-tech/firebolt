import FireboltProvider from "../components/FireboltProvider";

const createFireboltProvider =
  ({ formAccess, debug, stepQueryParam, requestsMetadata, withHistory }) =>
  (Component) =>
  () =>
    (
      <FireboltProvider
        formAccess={formAccess}
        debug={debug}
        stepQueryParam={stepQueryParam}
        requestsMetadata={requestsMetadata}
        withHistory={withHistory}
      >
        <Component />
      </FireboltProvider>
    );

export default createFireboltProvider;
