import FireboltFormEngine from "./FireboltFormEngine"
import { IFormAccess, IFormEngineOptions } from "./types"

export { default as uploadFilesToBucket } from "./requests/uploadFilesToBucket"
export const createFireboltForm = (
  access: IFormAccess,
  options?: IFormEngineOptions
) => new FireboltFormEngine(access, options)

//entities
export { default as File } from "./entities/File"

// helpers
export { default as handleEmailAutoSuggestion } from "./helpers/handleEmailAutoSuggestion"
export { default as getUrlParams } from "./helpers/getUrlParams"
export { default as getAutofillParam } from "./helpers/getAutofillParam"
export {
  clearFormSession,
  clearAllFormSessions,
} from "./helpers/session/clearFormSession"
export {
  getFieldProps,
  getFormattedPropsPresets,
} from "./formatters/applyPropsPresets"

export * from "./types"
