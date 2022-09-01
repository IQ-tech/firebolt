import faker from "faker"

import { IFlow } from "@iq-firebolt/entities"
import { IMockFlowOption } from "../presets/sample"
import { createNumberRange } from "../utils/createNumberRange"

const flowFactory = (options: IMockFlowOption): IFlow[] => {
  const rawFlow: IFlow[] = []

  const maxSteps = Math.max(...options.steps)
  const slugsList = createNumberRange(1, maxSteps).map(() => faker.lorem.slug())

  for (let i = 0; i < options.quantity; i++) {
    const slug = i === 0 ? "default" : faker.lorem.slug()
    const stepsNumber = options.steps[i]
    const alreadyUsedSlugs: string[] = []

    const stepsSlugs = createNumberRange(1, stepsNumber).map(() => {
      let index = 0
      while (alreadyUsedSlugs.includes(slugsList[index])) {
        index = Math.floor(Math.random() * stepsNumber)
      }
      alreadyUsedSlugs.push(slugsList[index])
      return slugsList[index]
    })

    rawFlow.push({ slug, stepsSlugs })
  }

  return rawFlow
}

export default flowFactory
