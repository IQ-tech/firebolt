import { ValidationResult, Validator } from "../../classes"

export interface IsValidNameProps {
  maxWordLength?: number
}

function isValidName(
  name = "",
  properties: IsValidNameProps
): ValidationResult {
  if (!name) return new ValidationResult(true)

  const safeName = name || ""
  const nameWithoutSpaces = safeName.trim()
  const fullNameArr = nameWithoutSpaces.split(/\s+/)

  // Have at least 2 words in name string
  const minNameCount = 1
  const isValidNameCount = fullNameArr.length > minNameCount
  if (!isValidNameCount) return new ValidationResult(false)

  // Have any word at least 2 chars, skips char e
  const haveAnyNameAtLeastTwoChar = !fullNameArr.filter(
    (partName) => partName.length < 2 && partName !== "e"
  ).length
  if (!haveAnyNameAtLeastTwoChar) return new ValidationResult(false)

  // Dont have any word with starts or ends with a single char
  const haveFirstOrLastWordWithSingleChar =
    fullNameArr[0].length < 2 || fullNameArr[fullNameArr.length - 1].length < 2
  if (haveFirstOrLastWordWithSingleChar) return new ValidationResult(false)

  // Have any invalid char
  const validCharRegex =
    /^[a-záéíóúàâêôãõüçñöÁÉÍÓÚÀÂÊÔÃÕÜÇÑÖ][a-z\\'áéíóúàâêôãõüçñöÁÉÍÓÚÀÂÊÔÃÕÜÇÑÖ\s-]+$/gi
  if (!nameWithoutSpaces.match(validCharRegex))
    return new ValidationResult(false)

  // Have double spaces on name string
  const noMatchDoubleSpaces = /^.*\s{2,}.*$/gi
  if (nameWithoutSpaces.match(noMatchDoubleSpaces))
    return new ValidationResult(false)

  // Have any blacklisted word
  const blackListedNames = /^(dr|dra|sr|sra|eng)$/
  if (
    fullNameArr.filter((word) => word.toLowerCase().match(blackListedNames))
      .length
  )
    return new ValidationResult(false)

  // Custom properties
  // Have any word greater than max word length
  if (properties?.maxWordLength !== undefined) {
    const { maxWordLength } = properties
    if (fullNameArr.filter((word) => word.length > maxWordLength).length)
      return new ValidationResult(false)
  }

  // Valid name
  return new ValidationResult(true)
}

export default new Validator(isValidName)
