import FireboltFormEngine from "./FireboltFormEngine";
export {
  clearFormSession,
  clearAllFormSessions,
} from "./helpers/session/clearFormSession";
export { default as uploadFilesToBucket } from "./requests/uploadFilesToBucket";

export const createFireboltForm = (...args) => new FireboltFormEngine(...args);

//entities
export { default as File } from "./entities/File";

// helpers
export { default as handleEmailAutoSuggestion } from "./helpers/handleEmailAutoSuggestion";
export { default as getUrlParams } from "./helpers/getUrlParams";
export { default as getAutofillParam } from "./helpers/getAutofillParam";

// todo remove comment
