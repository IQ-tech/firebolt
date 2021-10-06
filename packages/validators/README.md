# Firebolt Validator

![alt text](./static/Firebolt-logo.png)


A package full of brazilian based validations, designed to be used with `firebolt-api` and `firebolt-client`, or also with standalone applications.

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


### Validating standalone values

#### Using 'validate' function

```js
import { validate } from '@iq-firebolt/validators'

const isValueValid = validate('phone', '(11) 91234-1234).isValid
```

#### Using validators map

```js
import { validators } from '@iq-firebolt/validators'

const isValueValid = validators.phone.run('(11) 91234-1234').isValid
```

### Complex validators

Some validators need some extra data to validate a given value

```js
import { validate } from "@iq-firebolt/validators"

// validate(validatonName: string, value: any, properties: {})

const isValid = validate('bankAccountNumber', '123242-2', {bankSlug: "itau"}).isValid

```

### Group validation

Is possible to validate multiple fields at the same time with `validateGroup`

```js
import { validateGroup } from "@iq-firebolt/validators"

const fieldsValidation = validateGroup(
    ['cpf', '584.298.880-12'],
    ['name', 'random johson4'],
    ['minAge', '19/12/1999', { 'minAge': 18 }],
    ['cep', '13224-430']
) // {allFieldsValid: boolean, invalidFields: []}
```

### Firebolt focused functionality

This functions are used on `firebolt-api` and `firebolt-client` libs, it provides a convenient design to validate fields in a multistep form context, where inter relationships between fields are common.

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
