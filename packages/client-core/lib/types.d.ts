export interface FormSource {
  /** Firebolt root endpoint */
  root: string;
  /** Identifier to find form on endpoint */
  formName: string;
}

export interface SessionData {
  /** key to recover user session (used on authorization headeron request) */
  authKey: string;
}

export type GetPreviousStepRoute = (currentStep: string | number) => string

export type GetDebugStepRoute = (stepId: string | number) => string


export interface Endpoints {
  /** Route to start the form */
  base: string;
  /** Route to proceed to next step */
  nextStep: string;
  /** Return url to get previous step */
  getPreviousStepRoute: GetPreviousStepRoute;
  /** return url to get previous step */
  getDebugStepRoute: GetDebugStepRoute;
}
