import { CreatorFunction, ValidationFunction, IAction } from "./types"

export default function createValidator<EM, PM>(
  creatorFunction: CreatorFunction<EM, PM>,
  errors: EM
): ValidationFunction {
  return (givenValue, properties?: PM) => {
    const action: IAction = {
      approve: () => ({ isValid: true, givenValue }),
      refuse: (message: string) => ({ isValid: false, givenValue, message }),
    }
    return creatorFunction({ value: givenValue, action, errors, properties })
  }
}
