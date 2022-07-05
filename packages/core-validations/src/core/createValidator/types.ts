import { IValidationValueResult } from "../../types"

export interface ValidationFunctionOptions<EM = {}, P = {}> {
  errorsMap?: EM
  properties?: P
}
export type ValidationFunction<EM, P> = (
  value: any,
  options: ValidationFunctionOptions<EM, P>
) => IValidationValueResult


export interface IAction<E = string> {
  approve: () => IValidationValueResult
  refuse: (message?: E) => IValidationValueResult
}

export interface ICreatorFunctionArgs<EM ={}, PM ={}> {
  value: any
  action: IAction<keyof EM>
  properties?: PM
}
export type CreatorFunction<EM, PM> = (
  args: ICreatorFunctionArgs<EM, PM>
) => IValidationValueResult
