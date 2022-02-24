import FireboltFormEngine from "./FireboltFormEngine";
import { IFormAccess } from "./types";
export {
  clearFormSession,
  clearAllFormSessions,
} from "./helpers/session/clearFormSession";
export { default as uploadFilesToBucket } from "./requests/uploadFilesToBucket";

export const createFireboltForm = (args: IFormAccess) => new FireboltFormEngine(args);

//entities
export { default as File } from "./entities/File";

// helpers
export { default as handleEmailAutoSuggestion } from "./helpers/handleEmailAutoSuggestion";
export { default as getUrlParams } from "./helpers/getUrlParams";
export { default as getAutofillParam } from "./helpers/getAutofillParam";
