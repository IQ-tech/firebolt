import React from "react"
import FireboltProvider from "../components/FireboltProvider"
import { IFireboltProvider } from "../types"

const createFireboltProvider =
  ({
    formAccess,
    debug,
    stepQueryParam,
    requestsMetadata,
    withHistory,
    addons,
    mockStep,
    enforceNewSession
  }: IFireboltProvider) =>
  (Component: React.FunctionComponent) =>
  (props?: object) =>
    (
      <FireboltProvider
        formAccess={formAccess}
        debug={debug}
        stepQueryParam={stepQueryParam}
        requestsMetadata={requestsMetadata}
        withHistory={withHistory}
        addons={addons}
        mockStep={mockStep}
        enforceNewSession={enforceNewSession}
      >
        <Component {...props} />
      </FireboltProvider>
    )

export default createFireboltProvider
