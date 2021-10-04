import FireboltProvider from "../components/FireboltProvider"

const createFireboltProvider = ({ source, debug, stepQueryParam }) => (
  Component
) => () => (
  <FireboltProvider
    formSource={source}
    debugMode={debug}
    stepQueryParam={stepQueryParam}
  >
    <Component />
  </FireboltProvider>
)

export default createFireboltProvider
