import FireboltProvider from "../components/nFireboltProvider"; // v2-todo change

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
