import { IFireboltSession } from "@iq-firebolt/entities"
import { payloadFactory } from "./payloadFactory"

type ISessionOption =
  | "defaultOneStepCompleted"
  | "defaultTwoStepsCompleted"
  | "defaultThreeStepsCompleted"
  | "mediumOneStepCompleted"
  | "mediumTwoStepCompleted"

type IPossibleSessions = {
  [key in ISessionOption]: IFireboltSession
}

const sessionFactory = (type: ISessionOption) => possibleSessions[type]

const possibleSessions: IPossibleSessions = {
  defaultOneStepCompleted: {
    "sessionId": "mockSessionId1234-1",
    "experienceState": {
      "currentFlow": "default",
      "visualizingStepSlug": "documents",
      "lastCompletedStepSlug": "personal_data",
      "completedExperience": false,
    },
    "steps": {
      "personal_data": payloadFactory({ stepSlug: "personalData" }),
    },
  },
  defaultTwoStepsCompleted: {
    "sessionId": "mockSessionId1234-2",
    "experienceState": {
      "currentFlow": "default",
      "visualizingStepSlug": "address",
      "lastCompletedStepSlug": "documents",
      "completedExperience": false,
    },
    "steps": {
      "personal_data": payloadFactory({ stepSlug: "personalData" }),
      "documents": payloadFactory({ stepSlug: "documents" }),
    },
  },
  defaultThreeStepsCompleted: {
    "sessionId": "mockSessionId1234-3",
    "experienceState": {
      "currentFlow": "default",
      "visualizingStepSlug": "bills",
      "lastCompletedStepSlug": "documents",
      "completedExperience": false,
    },
    "steps": {
      "personal_data": payloadFactory({ stepSlug: "personalData" }),
      "documents": payloadFactory({ stepSlug: "documents" }),
      "address": payloadFactory({ stepSlug: "address" }),
    },
  },
  mediumOneStepCompleted: {
    "sessionId": "mockSessionId1234-b1",
    "experienceState": {
      "currentFlow": "medium",
      "visualizingStepSlug": "documents",
      "lastCompletedStepSlug": "personal_data",
      "completedExperience": false,
    },
    "steps": {
      "personal_data": payloadFactory({ stepSlug: "personalData" }),
    },
  },
  mediumTwoStepCompleted: {
    "sessionId": "mockSessionId1234-2",
    "experienceState": {
      "currentFlow": "medium",
      "visualizingStepSlug": "token",
      "lastCompletedStepSlug": "documents",
      "completedExperience": false,
    },
    "steps": {
      "personal_data": payloadFactory({ stepSlug: "personalData" }),
      "documents": payloadFactory({ stepSlug: "documents" }),
    },
  },
}

export default sessionFactory
