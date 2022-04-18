export const ErrorsConfigs = {
  /** JSON Errors */
  "JSONNotFound": {
    message: "JSON config file could not found",
  },
  "JSONWithoutDefaultFlow": {
    message: "JSON config file does not provide a default flow",
  },
  "JSONWithoutSpecifiedFlow": {
    message: "JSON config file does not provide a specified flow",
  },
  "noWayToFindJSONConfig": {
    message:
      "JSON config file or JSON config resolver were not provided to Firebolt Engine instance",
  },
  "stepNotFound": {
    message: "step could not be found on the JSON config file",
  },
  /** Resolver errors */
  "resolverMissing": {
    message: "Required engine resolver is missing on instance",
  },
  "resolverReturnIsInvalid": {
    message:
      "Data returned by resolver function is unexpected or nonexistent (bad implementation)",
  },
  /** Addons errors */
  "invalidAddon": {
    message: "Provided addon does not have required structure",
  },
  /** Validation Errors */
  "fieldValidation": {
    message: "Field from form step is invalid",
  },
  "blockProgressionDecision": {
    message: "Step transition has been denied due to some validation",
  },
  /** Generic error */
  "externalError": {
    message:
      "Error ocurred in external integrations (example: inside resolver function)",
  },
}
