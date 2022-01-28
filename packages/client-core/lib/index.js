import FireboltForm from "./FireboltForm";
export {
  clearFormSession,
  clearAllFormSessions,
} from "./helpers/session/clearFormSession";
export { default as uploadFilesToBucket } from "./requests/uploadFilesToBucket";

export const createFireboltForm = (...args) => new FireboltForm(...args);

// consts
export { default as uiPropsPresets } from "./constants/ui-props-presets";

//entities
export { default as File } from "./entities/File";

// helpers
export { default as handleEmailAutoSuggestion } from "./helpers/handleEmailAutoSuggestion";
export { default as getUrlParams } from "./helpers/getUrlParams";
export { default as getAutofillParam } from "./helpers/getAutofillParam";
