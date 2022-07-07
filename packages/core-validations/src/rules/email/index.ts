import createValidator from "../../core/createValidator"
import errorMessages from "./messages"

type ErrorsType = typeof errorMessages

const email = createValidator<ErrorsType>(({ value, action }) => {
  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

  const hasSpecialCharacter = /[~!"/#$%^&*()+=`{}[\]|\\:;'<>,?]/gi

  if(value.indexOf("@-") > 0 || value.indexOf("-.") > 0){
    return action.refuse("invalidDomain")
  }

  if(hasSpecialCharacter.test(value)){
    return action.refuse("specialCharacters")
  }

  if(!regExp.test(value)){
    return action.refuse("invalidEmail")
  }

  return action.approve()
}, errorMessages)

export default email
