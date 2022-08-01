import { Validator, ValidationResult } from "../../classes"

function isValidEmail(email = "") {
  if (!email) return new ValidationResult(true)

  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const noMatchSpecialChars = !email.match(/[~!#$%^&*()+=`{}[\]|\\:;'<>,?]/gi)
  const noAccents = !email.match(
    /[áàâãéèêíìîïóòôõöúùûçñÁÀÂÃÉÈÊÍÌÎÏÓÒÔÕÖÚÙÛÇÑ]/gi
  )
  const invalidEmailMessage = "Email inválido"

  if (email.indexOf("@-") > 0) {
    return new ValidationResult(false, invalidEmailMessage)
  }

  const isValid = regExp.test(email) && noMatchSpecialChars && noAccents
  const message = isValid ? "" : invalidEmailMessage

  return new ValidationResult(isValid, message)
}

export default new Validator(isValidEmail)
