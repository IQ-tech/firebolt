import faker from "faker"

import { IFlow } from "@iq-firebolt/entities"
import { createNumberRange } from "../utils/createNumberRange"
import { IMockFlowOption, SizeConfig } from "../types"

const flowFactory = ({
  size,
  keepDefault = true,
  includeSlugs,
}: IMockFlowOption): IFlow[] => {
  const rawFlow: IFlow[] = []
  const { flowSize, stepList } = handleFlowAndStepSize(size)

  const maxSteps = Math.max(...stepList)
  const slugsList = createNumberRange(1, maxSteps).map((_, index) => {
    if (includeSlugs && includeSlugs[index]) return includeSlugs[index]
    return faker.lorem.slug()
  })

  for (let i = 0; i < flowSize; i++) {
    const fakerSlug = faker.lorem.slug()
    const slug = i === 0 ? (keepDefault ? "default" : fakerSlug) : fakerSlug
    const stepsNumber = stepList[i]
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

const handleFlowAndStepSize = (size: SizeConfig) => {
  if (Array.isArray(size)) {
    const flowSize = size.length
    const stepList = size.map((item) => item)

    return { flowSize, stepList }
  } else if (typeof size === "number") {
    const stepList = []
    for (let i = 0; i <= size; i++) stepList.push(size)

    return { flowSize: size, stepList }
  } else {
    const stepList = []
    for (let i = 0; i <= size.contains; i++) stepList.push(size.contains)

    return { flowSize: size.items, stepList }
  }
}

export default flowFactory
