import createValidationRule from "../../core/createValidationRule"
import errorMessages from "./messages"

type ErrorsType = typeof errorMessages

const email = createValidationRule<{}, ErrorsType>(({ value, action }) => {
  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

  const hasSpecialCharacter = /[~!"/#$%^&*()+=`{}[\]|\\:;'<>,?]/gi

  if (value.indexOf("@-") > 0 || value.indexOf("-.") > 0) {
    return action.reprove("invalidDomain")
  }

  if (hasSpecialCharacter.test(value)) {
    return action.reprove("specialCharacters")
  }

  if (!regExp.test(value)) {
    return action.reprove("invalidEmail")
  }

  return action.approve()
}, errorMessages)

export default email
