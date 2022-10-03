import { IFireboltSession, IExperienceMetadata } from "@iq-firebolt/entities"
import computeExperienceMetadata from "./computeExperienceMetadata"
import JSONConfig from "../classes/JSONConfig"

import { MockExperience, sessionFactory } from "@iq-firebolt/mocks"
interface ISessionTestCase {
  label: string
  item: IFireboltSession
  expectedResult: IExperienceMetadata
}
const sampleExperienceSchemaMock = new MockExperience().rawExperience
const oneStepCompletedFlowDefault = sessionFactory("defaultOneStepCompleted")
const twoStepsCompletedFlowDefault = sessionFactory("defaultTwoStepsCompleted")
const threeStepsCompletedFlowDefault = sessionFactory(
  "defaultThreeStepsCompleted"
)
const oneStepCompletedFlowMedium = sessionFactory("mediumOneStepCompleted")
const twoStepsCompletedFlowMedium = sessionFactory("mediumTwoStepCompleted")

const defaultFlowMetadataStepsList = [
  { position: 1, slug: "personal_data", friendlyName: "Vamos começar" },
  { position: 2, slug: "documents", friendlyName: "Documentos" },
  { position: 3, slug: "address", friendlyName: "Endereço" },
  { position: 4, slug: "bills", friendlyName: "Adicionar Contas" },
]

const mediumFlowMetadataStepsList = [
  { position: 1, slug: "personal_data", friendlyName: "Vamos começar" },
  { position: 2, slug: "documents", friendlyName: "Documentos" },
  { position: 3, slug: "token", friendlyName: "Token" },
]

const sessionTestCasesDefaultFlow: ISessionTestCase[] = [
  {
    label: "experience with 4 steps and 1 step completed",
    item: oneStepCompletedFlowDefault,
    expectedResult: {
      name: "sample",
      currentPosition: 2,
      lastStepSlug: "bills",
      stepsList: defaultFlowMetadataStepsList,
      completedExperience: false,
    },
  },
  {
    label: "experience with 4 steps and 2 step completed",
    item: twoStepsCompletedFlowDefault,
    expectedResult: {
      name: "sample",
      currentPosition: 3,
      lastStepSlug: "bills",
      stepsList: defaultFlowMetadataStepsList,
      completedExperience: false,
    },
  },
  {
    label: "experience with 4 steps and 3 steps completed",
    item: threeStepsCompletedFlowDefault,
    expectedResult: {
      name: "sample",
      currentPosition: 4,
      lastStepSlug: "bills",
      stepsList: defaultFlowMetadataStepsList,
      completedExperience: false,
    },
  },
]

const sessionTestCasesMediumFlow: ISessionTestCase[] = [
  {
    label: "experience with 3 steps and 1 step completed",
    item: oneStepCompletedFlowMedium,
    expectedResult: {
      name: "sample",
      currentPosition: 2,
      lastStepSlug: "token",
      stepsList: mediumFlowMetadataStepsList,
      completedExperience: false,
    },
  },
  {
    label: "experience with 3 steps and 2 step completed",
    item: twoStepsCompletedFlowMedium,
    expectedResult: {
      name: "sample",
      currentPosition: 3,
      lastStepSlug: "token",
      stepsList: mediumFlowMetadataStepsList,
      completedExperience: false,
    },
  },
]

describe("function compute experience metadata correctly", () => {
  test.each(sessionTestCasesDefaultFlow)(
    "return correctly formatted metadata (default experience flow) - $label",
    ({ label, item, expectedResult }) => {
      const computedMetadata = computeExperienceMetadata(
        new JSONConfig(sampleExperienceSchemaMock),
        item
      )
      expect(computedMetadata).toEqual(expectedResult)
    }
  )

  test.each(sessionTestCasesMediumFlow)(
    "return correctly formatted metadata (medium experience flow) - $label",
    ({ label, item, expectedResult }) => {
      const computedMetadata = computeExperienceMetadata(
        new JSONConfig(sampleExperienceSchemaMock),
        item
      )
      expect(computedMetadata).toEqual(expectedResult)
    }
  )
})
