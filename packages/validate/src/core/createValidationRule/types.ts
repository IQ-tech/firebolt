import { IValidationValueResult } from "../../types"

export interface IAction<E = string> {
  approve: () => IValidationValueResult
  refuse: (message?: E) => IValidationValueResult
}

interface ICreatorFunctionArgs<EM = {}, PM = {}> {
  value: any
  action: IAction<keyof EM>
  properties?: PM
}
export type CreatorFunction<EM, PM> = (
  args: ICreatorFunctionArgs<EM, PM>
) => IValidationValueResult
