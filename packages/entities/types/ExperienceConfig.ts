export interface IExperienceConfig {
  /** This version should match with the used Firebolt version */
  "$schema-version"?: string
  /** The Version of the Experience */
  "$experience-version"?: string
  /** Name of the JSON form */
  name: string
  /**  Description of the current JSON */
  description: string
  /**  While transitioning steps, firebolt can execute a middleware called decision handler, with this function the developer can modify the natural flow of the experience, process incoming data...   */
  decisionHandlerConfig?: IDecisionHandlerConfig
  /** Flows are the possible flows that can be performed during a form completion experience. the form process will use only one flow at time, but the firebolt api can change the flow of a form on the process. */
  flows: IFlow[]
  /** Here we can define the possible steps that the form can have  */
  steps: IStepConfig[]
}

// ---- start IDecisionHandlerConfig
export interface IDecisionHandlerConfig {
  /** Defines the used decision handling, it can be made locally with a callback on the engine operations */
  strategy: IDecisionHandlerStrategy
  /** defines the steps that triggers a decision handling. accepts an array or steps slugs or the 'all' keyword */
  triggers: string[] | "all"
  /** defines the steps that should save processed data in the session. accepts an array or steps slugs or the 'all' keyword */
  saveProcessedData: string[] | "all"
  /** config used by the remote strategy */
  remoteConfig?: IRemoteDecisionConfig
}

export type IDecisionHandlerStrategy = "local" | "remote"

export interface IRemoteDecisionConfig {
  /** URL to be contacted during a remote decision handling, it receives a string or a map [stepSlug]: [requestUrl] */
  url: IRemoteDecisionURL
  /** Headers to be added into the remote decision request */
  headers?: {
    [key: string]: string | boolean | number
  }
}
type IRemoteDecisionURL = IRemoteDecisionURLMap | string

interface IRemoteDecisionURLMap {
  [stepKey: string]: string
}

// ---- start IFlow
export interface IFlow {
  /** An identifier to the flow, every form should have a default flow */
  slug: string
  /** The list of steps that this flow should have, this array contains a list of steps slugs */
  stepsSlugs: string[] // todo - convert to object when implementing globals
}

// ---- start IStepConfig
export interface IStepConfig {
  /** An unique identifier to this step */
  slug: string
  /** Should be 'form' or 'custom', is used to distiguish between a regular form step or a custom step that should not have field validations */
  type: "form" | "custom" // qualquer coisa alem desses dois vai ser tratado como custom
  /** This property is used to define a friendly display name to the step */
  friendlyName: string
  /** Used to define the list of fields inside a step, is not required in custom steps */
  fields?: IFieldConfig[]
}

export interface IFieldConfig {
  /** An unique identifier to the field */
  slug: string
  /** The Widget (firebolt-client component) that should be used on render the form. check the firebolt client to see the available widgets. custom widgets can be used with custom firebolt-client themes */
  "ui:widget": string
  /** Any value that can be passed right to the UI Widgets (components), values like label, placeholde, options, etc. these options are defined by the theme used by the front-end app */
  "ui:props"?: {
    [propKey: string]: any
  }
  /**  */
  "ui:props-preset"?: string | [] // todo add multiple props presets
  /** Conditionally add properties to a widget */
  "ui:props-conditional"?: IFieldPropsConditional[]
  /** used to modify certain aspects of the fields presentation, such as size */
  "ui:styles"?: IFieldStyles
  /** mask in the text-field-mask format */
  "ui:mask"?: string[] | INumberRangeArgs
  /** Defines if the field is required also receives a logical expression, if false the field won't be rendered or validated */
  required?: boolean | string
  /** Used to defined wich validators should be applied to the field, these validators can run on the client app or in the server */
  validation?: IFieldValidationRuleConfig[]
  /** field value */
  value?: any
}

export interface INumberRangeArgs {
  /** TODO */
  minNumber?: number
  /** TODO */
  maxNumber?: number
  /** TODO */
  decimalSymbol?: string
  /** TODO */
  thousandsSeparatorSymbol?: string
  /** TODO */
  abovePermitedValueMessage?: string
  /** TODO */
  underPermitedValueMessage?: string
}

export interface IFieldPropsConditional {
  /** receives a logical expression, if false the field won't be rendered or validated */
  conditional: string
  /** UI props conditional props */
  props: {
    [propKey: string]: any
  }
}

export interface IFieldStyles {
  /** Set field horizontal size on UI */
  size: "full" | "half"
}

export interface IFieldValidationRuleConfig {
  /**  TODO */
  rule: string
  /**  TODO */
  properties?: {
    [propertyKey: string]: any
  }
  errorsMap?: {
    [errorKey: string]: string
  }
  /** context: Specify the context when the validator should be used */
  context?: ExperienceContext
}


export type ExperienceContext = "client" | "server" | "all"