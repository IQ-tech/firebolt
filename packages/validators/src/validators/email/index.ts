import { Validator, ValidationResult } from "../../classes"


const domainSuggestionList = {
  "bol.com": "bol.com.br",
  "gmail.com.br": "gmail.com",
  "gmai.com": "gmail.com",
  "gmil.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gemail.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gamail.com": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.co.com": "gmail.com",
  "gmsil.com": "gmail.com",
  "ymail.com": "gmail.com",
  "email.com": "gmail.com",
  "gm.com": "gmail.com",
  "gmail.cm": "gmail.com",
  "g.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmeil.com": "gmail.com",
  "hotmai.com": "hotmail.com",
  "hormail.com": "hotmail.com",
  "hotmil.com": "hotmail.com",
  "hotmal.com": "hotmail.com",
  "hitmail.com": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "hotmsil.com": "hotmail.com",
  "homail.com": "hotmail.com",
  "hotimail.com": "hotmail.com",
  "hmail.com": "hotmail.com",
  "hotmail.co": "hotmail.com",
  "htmail.com": "hotmail.com"
}

type DomainKey = keyof typeof domainSuggestionList


function isValidEmail(email = "") {
  if (!email) return new ValidationResult(true)

  const usernameEmail = email.split("@")[0]
  const domainEmail = email.split("@")[1] as DomainKey

  if (domainSuggestionList?.[domainEmail]) {
    const sugestionEmailMessage = `Você quis dizer ${usernameEmail}@${domainSuggestionList[domainEmail]}?`
    return new ValidationResult(false, sugestionEmailMessage)
  }

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
