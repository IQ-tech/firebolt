import { createValidationRule } from "@iq-firebolt/validate"

const phone = createValidationRule(
  ({ value, action }) => {
    const safeValue = value || ""

    const stringfied = `${safeValue}`
    const hasInvalidChars = (stringfied || "").split("").every((char) => {
      const isANumber = /^\d+$/.test(char)
      const isAParenthesis = char === "(" || char === ")"
      const isADash = char === "-"
      const isASpace = char === " "
      return isANumber || isAParenthesis || isADash || isASpace
    })

    if (!hasInvalidChars) return action.reprove("invalidChars")
    const onlyNums = stringfied.replace(/\D/g, "")
    if (!(onlyNums.length >= 10 && onlyNums.length <= 11)) {
      return action.reprove("defaultError")
    }

    if (onlyNums.length === 11 && parseInt(onlyNums.substring(2, 3)) !== 9) {
      return action.reprove("defaultError")
    }

    for (let n = 0; n < 10; n++) {
      const strN = String(n)
      if (
        onlyNums === new Array(11).join(strN) ||
        onlyNums === new Array(12).join(strN)
      ) {
        return action.reprove("defaultError")
      }
    }

    const validDDD = [
      11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34,
      35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62,
      64, 63, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85,
      86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
    ]

    if (validDDD.indexOf(parseInt(onlyNums.substring(0, 2))) === -1) {
      return action.reprove("defaultError")
    }

    return action.approve()
  },
  {
    "invalidChars": "O Telefone possui caracteres inválidos",
    "defaultError": "O Telefone não é válido",
  }
)

export default phone
