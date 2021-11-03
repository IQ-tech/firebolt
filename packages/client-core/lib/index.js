import FireboltForm from "./FireboltForm";
export {
  clearFormSession,
  clearAllFormSessions,
} from "./helpers/session/clearFormSession";
export { default as uploadFilesToBucket } from "./requests/uploadFilesToBucket";

export const createFireboltForm = (config) => new FireboltForm(config);

// consts
export { default as uiPropsPresets } from "./constants/ui-props-presets";

//entities
export { default as File } from "./entities/File";

// helpers
export { default as handleEmailAutoSuggestion } from "./helpers/handleEmailAutoSuggestion";
export { default as getUrlParams } from "./helpers/getUrlParams";
