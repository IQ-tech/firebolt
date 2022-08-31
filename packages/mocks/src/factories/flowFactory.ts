import faker from "faker"

import { IFlow } from "@iq-firebolt/entities"
import { IMockFlowOption } from "../presets/sample"

const flowFactory = (options: IMockFlowOption): IFlow[] => {
  const rawFlow: IFlow[] = []

  const maxSteps = Math.max(...options.steps)
  const slugsList = createRange(0, maxSteps).map(() => faker.lorem.slug())

  for (let i = 0; i < options.quantity; i++) {
    const slug = i === 0 ? "default" : faker.lorem.slug()
    const stepsNumber = options.steps[i]
    const alreadyUsedSlugs: string[] = []
    const stepsSlugs = createRange(1, stepsNumber).map(() => {
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

const createRange = (start: number, end: number) => {
  const length = end - start
  return Array.from({ length }, (_, i) => start + i)
}

export default flowFactory
