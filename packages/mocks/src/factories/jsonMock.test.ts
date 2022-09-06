import flowFactory from "./flowFactory"

describe("MockExperience", () => {
  test("Factories: Flows(with array size)", () => {
    const flow = flowFactory("default-sample")

    expect(flow[0].slug).toBe("default")
    expect(flow[0].stepsSlugs.length).toBe(4)
    expect(flow.length).toBeGreaterThan(1)
  })

  test("Factories: Flows(without default flows)", () => {
    const flowMock = flowFactory("missing-default")
    expect(flowMock[0].slug).not.toBe("default")
  })

  test("Factories: Flows(missing step list)", () => {
    const flowMock = flowFactory("missing-step-list")
    expect(flowMock[0].stepsSlugs.length).toBe(0)
  })

  test("Factories: Flows(with includesSlugs)", () => {
    const flowMock = flowFactory("missing-step")
    expect(flowMock[0].stepsSlugs.includes("missing_step")).toBe(true)
  })

  // test.todo("Factories: Fields")
  // test.todo("Factories: Steps")
  // test.todo("Factories: Experience")
  // test.todo("Classes: Experience")
  // test.todo("Classes: Fields")
  // test.todo("Classes: Steps")
  // test.todo("Classes: Flows")
})
