# Firebolt Validate

The Firebolt Validate library brings a simple pattern to implement and utilize value validation functions, it also has a series of core rules out of the box.

## Why Firebolt Validation

There are lots of excellent validation libraries, but they work in very different ways and formats. the Firebolt Validate try to bring a way to patternize and compose all those validation rules. another item that this library is focused is the validation feedback, such as i18n and the possibilty to define custom feedback messages for each validation error case. the Firebolt Validate library can be combined with any existent validation library <3.

## Getting started

The following instructions show you how to install the package and create your
own validation

### Prerequisites

Requirements for the software and other tools to build, test and push

- [nodejs](https://nodejs.org/)
- [npm](http://npmjs.org/) or [yarn](https://yarnpkg.com/)

### Installing

You need to install this package using `npm` or `yarn` and you should
be ready to go

npm

    npm install --save redventures/@iq-firebolt/validators

yarn

    yarn add redventures/@iq-firebolt/validators

## Usage

### Directly importing a rule

You can import one of the core rules included in the package:

```js
import { stringLength } from "firebolt-validate"

const { isValid, message } = stringLength("myValue", {
  properties: { maxLength: 5 },
})
```

### Defining custom messages to the validation rule

We believe that a validation may fail due to many reasons, instead of being just a matter of `true` or `false`. we call these reasons "error cases". each validation rule can have custom messages for each error case using the `errorsMap` option key:

```js
const validation = stringLength("i like pizza", {
  properties: { maxLength: 5, minLength: 2 },
  errorsMap: {
    "greaterThanMax":
      "The value '#{value}' is begger than the limit of #{maxLength} characters",
    "smallerThanMin":
      "The value '#{value}' is smaller the minimun of #{minLength} characters",
  },
})

console.log(validation.message) // "The value 'i like pizza' is bigger than the limit o 5 characters
```

### Freezing a rule

It is possible to simplify generic rules into simpler ones using the freeze function, with this feature we can define properties of the validation before it occurs:

```js
// importing a generic validation rule
import { stringLength } from "firebolt-validate"

// freezing it into a more specific rule
const isBiggerThan5Chars = stringLength.freeze({ maxLength: 5 }) // [validator].freeze(properties, errorsMap)

// Using the new validation rule
const { isValid, message } = isBiggerThan5Chars("i like potato")
```

### Composing rules

We can also compose rules into a single one using the `composeRules` function:

```js
import {
  composeRules,
  stringLength,
  email,
  wordsLength,
} from "firebolt-validate"

const myComposedRule = composeRules(
  email,
  stringLength.freeze({ maxLength: 20 }),
  wordsCount.freeze({ maxWords: 1 })
)

const validation = myComposedRule("myreallylongemail@carrot.com")

console.log(validation.message)
// "Value 'myreallylongemail@carrot.com' is greater than the max length: 20 chars"
```

Composing rules is also useful when complex regex validations are necessary:

```js
import { composeRules, regexMatch } from "firebolt-validate"

const hasSpecificFormat = regexMatch.freeze(
  {
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    shouldMatch: true,
  },
  { invalidField: "The value #{value} should have the format xxxx@xxxx.xxx" }
) // creating a custom message for each rule is optional, it already has a default one

const hasSpecialChars = regexMatch.freeze(
  {
    pattern: /[~!"/#$%^&*()+=`{}[\]|\\:;'<>,?]/gi,
    shouldMatch: false,
  },
  {
    invalidField: "The value should not contain special characters",
  }
)

const myComplexValidation = composeRules(hasSpecificFormat, hasSpecialChars)

const { isValid, message } = myComplexValidation("someweird value +sd*")
```


### Creating custom rules
To create a efficient rule, is necessary to understand some important concepts:
* properties: values that a rule can receive to validate a value, example: a `maxWidth` to a `stringLength` rule.
* errorsMap: A map where we can define a error message to each validation error case.
* action: an object that contain two function `action.approve()` and `action.reprove([errorCaseId])`, used to define if a value is valid or not.
the `createValidationRule` function, receives two parameters, a builder function and a default errorsMap object.

```js
import { createValidationRule } from "firebolt-validate"

// Creating the rule

const isPotato = createValidationRule(({value, action}) => {
  if(value === "potato"){
    return action.accept()
  }
},{})

```



### Firebolt ecosystem focused functionality

This functions are used on `firebolt-engine` and `firebolt-client` libs, it provides a convenient design to validate fields in a multistep form context, where inter relationships between fields are common.

### `validateFBTField` and `validateFBTStep`

Validates a field created by a firebolt dynamic form. It relates the field defined on the firebolt step scheme and the filled form payload, it also can use other fields as parameter to validations.
ex.: To validate a bank account, we need to consider other form fields as bank brand, agency, etc.

```js
import { validateFBTField, validateFBTStep } from '@iq-firebolt/validators'

const fireboltStepFieldScheme = {
    fields: [
      {
        "slug": "bank_name",
        "validators": [
          {
            "type": "required"
          }
        ]
      },
      {
        "slug": "bank_branch",
        "validators": [
          {
            "type": "required"
          }
        ]
      },
      {
        "slug": "bank_account_type",
        "validators": [
            {
              "type": "required"
            }
          ]
      },
      {
        "slug" : "bank_account_number",
        "validators": [
          {
            'type': 'bankAccountNumber',
            'properties': {
              'bankBranch': 'field:bank_branch',
              'bankSlug': 'field:bank_name',
              'accountType': 'field:bank_account_type',
            },
          },
        ]
      }
    ]

    const formPayload: {
      bank_branch: '0102',
      bank_name: 'itau',
      account_type: '012',
      bank_account_number: '2342325-3'
    }

    // Validating a single field

    const fields = fireboltStepFieldScheme.fields
    const fieldBankScheme = fields[3]
    const isFieldValid = validateFBTField(fieldBankScheme, formPayload)

    // Validating full step

    const isStepValid = validateFBTStep({stepFields: fields, formPayload })
}

```

## Running the tests

Jest is installed to automated tests

### How to execute tests

All you have to do is run

npm

    npm run test

yarn

    yarn run test

## Deployment

Every time you add a new validation you have to commit your changes and update
package installed on your project

    yarn build
