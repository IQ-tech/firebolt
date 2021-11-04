import FireboltProvider from "../components/FireboltProvider";

const createFireboltProvider =
  ({ formAccess, debug, stepQueryParam, requestsMetadata }) =>
  (Component) =>
  () =>
    (
      <FireboltProvider
        formAccess={formAccess}
        debug={debug}
        stepQueryParam={stepQueryParam}
        requestsMetadata={requestsMetadata}
      >
        <Component />
      </FireboltProvider>
    );

export default createFireboltProvider;
