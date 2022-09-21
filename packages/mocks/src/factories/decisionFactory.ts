import {
  IDecisionHandlerConfig,
  IRemoteDecisionConfig,
} from "@iq-firebolt/entities"

const decisionFactory = (
  {
    strategy = "local",
    triggers = "all",
    saveProcessedData = "all",
    remoteConfig,
  } = {} as IDecisionHandlerConfig
) => {
  const remoteConfigMock: IRemoteDecisionConfig = {
    url: "https://teste.com.br",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer ",
    },
  }

  const local: IDecisionHandlerConfig = {
    strategy: "local",
    triggers,
    saveProcessedData,
  }

  const remote: IDecisionHandlerConfig = {
    strategy: "remote",
    triggers,
    saveProcessedData,
    remoteConfig: remoteConfig || remoteConfigMock,
  }

  const decisionHandlerConfig = strategy === "local" ? local : remote

  return { decisionHandlerConfig }
}

export default decisionFactory
