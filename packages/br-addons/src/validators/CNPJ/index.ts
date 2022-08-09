import { createValidationRule } from "@iq-firebolt/validate"
import { cnpj } from "cpf-cnpj-validator"

const CNPJ = createValidationRule(
  ({ value, action }) => {
    const isValid = cnpj.isValid(value)

    if (isValid) return action.approve()
    else return action.reprove("defaultError")
  },
  {
    "defaultError": "CNPJ não é válido",
  }
)

export default CNPJ
