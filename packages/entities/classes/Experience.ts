import Step from "./Step"
import { IExperienceConfig } from "../types"

class Experience {
  private rawConfig: IExperienceConfig

  constructor(rawConfig: IExperienceConfig) {}

  get raw() {
    return this.rawConfig
  }

  // parse experience json to interactive class
  // static parse(raw): Experience {
  //   const parsedSteps = raw.map((item) => Step.parse(item))
  //   return new Experience({ steps: parsedSteps }, raw)
  // }

  // getStepBySlug(): Step | undefined {
  //   return new Step()
  // }

  // getStepByPosition(position: number, flow: string): Step | undefined {
  //   return new Step()
  // }

  // getFlow() {}

  // get flows() {
  //   return ""
  // }
}

export default Experience

// const experience =  Experience.parse(formJson)

// experience.getStepAt(2, "default")
// const step2 = experience.getFlow('default').stepAt(2)
// const name = step2.getField('name')

// getStepBySlug
//
