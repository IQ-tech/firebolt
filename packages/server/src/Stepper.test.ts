import faker from "faker"
import JSONSample from "./json-sample.json"
import Stepper from "./Stepper"

const localStorage = global.localStorage

describe("Stepper.Proceed handling", () => {
  test.todo("should start a new experience")
  test.todo("should identify an started experience and return the correct step")
  test.todo("should validate the step fields and return an error")
  test.todo("should validate the step fields and return the next step info")
  test.todo("should be able update previous steps without data loss")
})

describe("Props presets apply", () => {
  test.todo("props presets should be applied on Engine.start return value")

  test.todo("props presets should be applied on Engine.proceed return value")

  test.todo("props presets should be applied on Engine.goBack return value")

  test.todo("props presets should be applied on Engine.debug return value")
})

describe("Stepper hooks working", () => {})
