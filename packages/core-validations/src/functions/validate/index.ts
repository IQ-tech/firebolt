var constraints = {
  username: {
    presence: true,
    exclusion: {
      within: ["nicklas"],
      message: "'%{value}' is not allowed",
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters",
    },
  },
}

const json = {
  "slug": "responsability_check",
  "required": true,
  "ui:widget": "Check",
  "ui:props": {
    "label":
      "Declaro que nasci no Brasil; que possuo domícilio fiscal somente no Brasil; que sou responsável pelos meus atos; que <strong>NÃO</strong> sou Pessoa Politicamente Exposta.",
  },
  "validators": [
    {
      "rule": "stringLength",
      "properties": { "maxLength": 3 },
      "context": "server",
    },
  ],
}

const jaaason = {
  "validators": {
    "stringLength": {
      "context": "server",
      "required": true,
      "exclusion": {
        "within": ["nicklas"],
        "message": "'%{value}' is not allowed",
      },
      "format": {
        "pattern": "[a-z0-9]+",
        "flags": "i",
        "message": "can only contain a-z and 0-9",
      },
      //   "error": "mensagem paranaue!!!",
    },

    "name": {
      "required": true,
      "max": 10,
      "min": 5,
      "error": "mensagem paranaue!!!",
    },

    "custom": {
      "required": true,
      "max": 10,
      "min": 5,
      "error": "mensagem paranaue!!!",
    },
  },
}

const validate = ({}, jaaason: any) => {
  const { userName } = jaaason

  if (constraints.custom) return "asdasdasdasd"
}

//   validate.async({}, constraints, {wrapErrors: ValidationErrors})
//   .then(success)
//   .catch(ValidationErrors, function(error) {
//     // Handle the validation errors
//     console.log("ValidationErrors", error);
//   })
//   .catch(function(error) {
//     // Handle other errors;
//     console.log("SystemError", error);
//   });
