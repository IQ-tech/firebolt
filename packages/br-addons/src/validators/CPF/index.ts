import { createValidationRule } from "@iq-firebolt/validate"
import { cpf } from "cpf-cnpj-validator"

const CPF = createValidationRule(
  ({ value, action }) => {
    const hasSpecialChar = value.replace(/[._-]+/gi, "").match(/^(.)\1+$/)
    const isValid = !hasSpecialChar && cpf.isValid(value)

    return isValid ? action.approve() : action.reprove("defaultError")
  },
  {
    "defaultError": "CPF inválido",
  }
)

export default CPF
