import createValidator from "../../core/createValidator"
import errorMessages from "./messages"

export interface IRepeatedChars {
  char?: string 
  times?: number
}

type ErrorsType = typeof errorMessages

const repeatedChars = createValidator<ErrorsType, IRepeatedChars>(
  ({ value, action, properties = {} }) => {
   
    const { char, times } = properties 

  if(!!char && !!times) {
      const valid = new RegExp(char?.repeat(times))
      

  }  

    return action.approve()

  },
  errorMessages
)

export default repeatedChars
