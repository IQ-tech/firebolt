const jsonSchema = require("../form-schema.json");
const Ajv = require("ajv");

function validateJSONForm(data) {
  const ajv = new Ajv({strict: false});
  const validate = ajv.compile(jsonSchema);
  const valid = validate(data);
  return !!valid ? true : validate.errors;
}

exports.validateJSONForm = validateJSONForm;
