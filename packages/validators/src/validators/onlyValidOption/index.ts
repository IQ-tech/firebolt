import { ValidationResult, Validator } from "../../classes"

interface onlyValidOptionArgs {
  options: { label: string; value: number }[]
}

function onlyValidOption(
  value: string | number,
  { options }: onlyValidOptionArgs
): ValidationResult {
  const isValid = options?.some((option) => option?.value === value)
  const message = isValid ? "" : "Selecione uma opção válida"

  return new ValidationResult(isValid, message)
}

export default new Validator<onlyValidOptionArgs>(onlyValidOption)
