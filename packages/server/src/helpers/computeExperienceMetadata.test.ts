import sampleExperienceSchemaMock from "../mocks/sample-experience"
import {
  oneStepCompletedFlowDefault,
  twoStepsCompletedFlowDefault,
  threeStepsCompletedFlowDefault,
  defaultFlowMetadataStepsList,
  mediumFlowMetadataStepsList,
  oneStepCompletedFlowMedium,
  twoStepsCompletedFlowMedium,
} from "../mocks/sample-experience-session"
import computeExperienceMetadata from "./computeExperienceMetadata"
import { IFireboltSession, IExperienceMetadata } from "../interfaces/IEngine"

interface ISessionTestCase {
  label: string
  item: IFireboltSession
  expectedResult: IExperienceMetadata
}

const sessionTestCasesDefaultFlow: ISessionTestCase[] = [
  {
    label: "experience with 4 steps and 1 step completed",
    item: oneStepCompletedFlowDefault,
    expectedResult: {
      name: "sample",
      currentFlow: "default",
      currentStepSlug: "documents",
      lastCompletedStepSlug: "personal_data",
      currentPosition: 2,
      lastStepSlug: "bills",
      stepsList: defaultFlowMetadataStepsList,
    },
  },
  {
    label: "experience with 4 steps and 2 step completed",
    item: twoStepsCompletedFlowDefault,
    expectedResult: {
      name: "sample",
      currentFlow: "default",
      currentStepSlug: "address",
      lastCompletedStepSlug: "documents",
      currentPosition: 3,
      lastStepSlug: "bills",
      stepsList: defaultFlowMetadataStepsList,
    },
  },
  {
    label: "experience with 4 steps and 3 steps completed",
    item: threeStepsCompletedFlowDefault,
    expectedResult: {
      name: "sample",
      currentFlow: "default",
      currentStepSlug: "bills",
      lastCompletedStepSlug: "address",
      currentPosition: 4,
      lastStepSlug: "bills",
      stepsList: defaultFlowMetadataStepsList,
    },
  },
]

const sessionTestCasesMediumFlow: ISessionTestCase[] = [
  {
    label: "experience with 3 steps and 1 step completed",
    item: oneStepCompletedFlowMedium,
    expectedResult: {
      name: "sample",
      currentFlow: "medium",
      currentStepSlug: "documents",
      lastCompletedStepSlug: "personal_data",
      currentPosition: 2,
      lastStepSlug: "token",
      stepsList: mediumFlowMetadataStepsList,
    },
  },
  {
    label: "experience with 3 steps and 2 step completed",
    item: twoStepsCompletedFlowMedium,
    expectedResult: {
      name: "sample",
      currentFlow: "medium",
      currentStepSlug: "token",
      lastCompletedStepSlug: "documents",
      currentPosition: 3,
      lastStepSlug: "token",
      stepsList: mediumFlowMetadataStepsList,
    },
  },
]

describe("function compute experience metadata correctly", () => {
  test.each(sessionTestCasesDefaultFlow)(
    "return correctly formatted metadata (default experience flow) - $label",
    ({ label, item, expectedResult }) => {
      const computedMedatada = computeExperienceMetadata(
        sampleExperienceSchemaMock,
        item
      )
      expect(computedMedatada).toEqual(expectedResult)
    }
  )

  test.each(sessionTestCasesMediumFlow)(
    "return correctly formatted metadata (medium experience flow) - $label",
    ({ label, item, expectedResult }) => {
      const computedMedatada = computeExperienceMetadata(
        sampleExperienceSchemaMock,
        item
      )
      expect(computedMedatada).toEqual(expectedResult)
    }
  )
})
