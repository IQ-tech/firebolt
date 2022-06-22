import { parseMask, ResolvedMask } from "./helpers"


describe("helper parseMask parse stringfied masks correctly", () => {

  const testCases: ResolvedMask[][] = [[
    ["/\\d/", "/\\d/", "/\\d/", "/\\d/", "/\\d/", "-", "/\\d/", "/\\d/", "/\\d/"],
    ["/\\d/", "/\\d/", "/\\d/", "/\\d/", "/\\d/", "-", "/\\d/", "/\\d/", "/\\d/"]
  ]]
  test.each(testCases)("should parse correct value", (mask) => {
    const parsed = parseMask(mask)
    
    expect(parsed[0] instanceof RegExp).toBeTruthy()
    expect(parsed[parsed.length - 1] instanceof RegExp).toBeTruthy()
  })
})