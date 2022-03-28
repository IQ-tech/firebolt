import sampleExperienceSchemaMock from "../mocks/sample-experience"
import {
  oneStepCompleted,
  twoStepsCompleted,
  threeStepsCompleted,
  defaultFlowMetadataStepsList,
} from "../mocks/sample-experience-session"
import computeExperienceMetadata from "./computeExperienceMetadata"
import { IFireboltSession, IExperienceMetadata } from "../interfaces/IEngine"

interface ISessionTestCase {
  label: string
  item: IFireboltSession
  expectedResult: IExperienceMetadata
}

describe("function compute experience metadata correctly", () => {
  const sessionTestCases: ISessionTestCase[] = [
    {
      label: "experience with 4 steps and 1 step completed",
      item: oneStepCompleted,
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
      item: twoStepsCompleted,
      expectedResult: {
        name: "sample",
        currentFlow: "default",
        currentStepSlug: "documents",
        lastCompletedStepSlug: "",
        currentPosition: 3,
        lastStepSlug: "personal_data",
        stepsList: defaultFlowMetadataStepsList,
      },
    },
    {
      label: "experience with 4 steps and 3 steps completed",
      item: threeStepsCompleted,
      expectedResult: {
        name: "sample",
        currentFlow: "default",
        currentStepSlug: "documents",
        lastCompletedStepSlug: "",
        currentPosition: 4,
        lastStepSlug: "personal_data",
        stepsList: defaultFlowMetadataStepsList,
      },
    },
  ]

  test.each(sessionTestCases)(
    "return correctly formatted metadata - $label",
    ({ label, item, expectedResult }) => {
      const computedMedatada = computeExperienceMetadata(
        sampleExperienceSchemaMock,
        item
      )
      expect(computedMedatada).toEqual(expectedResult)
    }
  )
})
