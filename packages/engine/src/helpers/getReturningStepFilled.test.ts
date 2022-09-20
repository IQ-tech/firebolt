import { IFireboltSession } from "@iq-firebolt/entities"
import getReturningStepFilled from "./getReturningStepFilled"
import sampleExperience from "../mocks/sample-experience"

describe("test autofill work", () => {
  test("Function should return a new step filled", () => {
    const mockSession: IFireboltSession = {
      sessionId: "sdsfs",
      experienceState: {
        lastCompletedStepSlug: "",
        visualizingStepSlug: "",
        currentFlow: "default",
        completedExperience: false,
      },
      steps: {
        "personal_data": {
          "fields": {
            "full_name": "carlos cenoura",
            "email": "carloscenoura@batata.com",
          },
        },
      },
    }

    const mockStep = sampleExperience.steps[0]
    const newStep = getReturningStepFilled(mockStep, mockSession)

    expect(newStep.fields?.[0]?.value).toBe("carlos cenoura")
    expect(newStep.fields?.[1]?.value).toBe("carloscenoura@batata.com")
    expect(newStep.slug).toBe("personal_data")
  })
  test("Should return the same step, if no session is provided", () => {
    const mockStep = sampleExperience.steps[0]
    const newStep = getReturningStepFilled(mockStep)

    expect(mockStep).toBe(newStep)
  })
  test("Should return the same step, if empty session is provided", () => {
    const mockSession: IFireboltSession = {
      sessionId: "sdsfs",
      experienceState: {
        lastCompletedStepSlug: "",
        visualizingStepSlug: "",
        currentFlow: "default",
        completedExperience: false,
      },
      steps: {
        "personal_data": {
          "fields": {},
        },
      },
    }
    const mockStep = sampleExperience.steps[0]
    const newStep = getReturningStepFilled(mockStep)
    expect(mockStep).toBe(newStep)
  })
})
