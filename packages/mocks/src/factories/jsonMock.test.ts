import flowFactory from "./flowFactory"
import { IMockFlowOption } from "../types"

describe("MockExperience", () => {
  test("Factories: Flows(with number size)", () => {
    const options: IMockFlowOption = { size: 3 }
    const flowMock = flowFactory(options)
    expect(flowMock.length).toBe(3)
    expect(flowMock[0].stepsSlugs.length).toBe(3)
    expect(flowMock[1].stepsSlugs.length).toBe(3)
  })

  test("Factories: Flows(with array size)", () => {
    const options: IMockFlowOption = { size: [5, 4, 3, 2] }
    const flowMock = flowFactory(options)

    expect(flowMock.length).toBe(4)
    expect(flowMock[0].stepsSlugs.length).toBe(5)
    expect(flowMock[1].stepsSlugs.length).toBe(4)
    expect(flowMock[2].stepsSlugs.length).toBe(3)
    expect(flowMock[3].stepsSlugs.length).toBe(2)
  })

  test("Factories: Flows(with object size)", () => {
    const options: IMockFlowOption = { size: { items: 5, contains: 4 } }
    const flowMock = flowFactory(options)

    expect(flowMock.length).toBe(5)
    expect(flowMock[0].stepsSlugs.length).toBe(4)
    expect(flowMock[3].stepsSlugs.length).toBe(4)
  })

  test("Factories: Flows(with includesSlugs)", () => {
    const includeSlugs = ["batata", "cenoura"]
    const options: IMockFlowOption = { size: [5, 3, 1], includeSlugs }
    const flowMock = flowFactory(options)

    const mockedStepSlugs: string[] = []
    flowMock.forEach((item) => mockedStepSlugs.push(...item.stepsSlugs))

    expect(mockedStepSlugs.includes(includeSlugs[0])).toBe(true)
    expect(mockedStepSlugs.includes(includeSlugs[1])).toBe(true)
  })

  test("Factories: Flows(without default flow)", () => {
    const options: IMockFlowOption = { size: 2, keepDefault: false }
    const flowMock = flowFactory(options)
    expect(flowMock[0].slug).not.toBe("default")
  })

  test.todo("Factories: Fields")
  test.todo("Factories: Steps")
  test.todo("Factories: Experience")
  test.todo("Classes: Experience")
  test.todo("Classes: Fields")
  test.todo("Classes: Steps")
  test.todo("Classes: Flows")
})
