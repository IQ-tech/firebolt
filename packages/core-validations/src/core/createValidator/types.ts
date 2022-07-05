import { IValidationValueResult } from "../../types"

export type ValidationFunction = (value: any) => IValidationValueResult
export interface IAction {
  approve: () => IValidationValueResult
  refuse: (message: string) => IValidationValueResult
}
export interface ICreatorFunctionArgs<EM, PM> {
  value: any
  action: IAction
  errors: EM
  properties?: PM
}
export type CreatorFunction<EM, PM> = (
  args: ICreatorFunctionArgs<EM, PM>
) => IValidationValueResult
