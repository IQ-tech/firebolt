const nextStepWithPropsPresets = {
  "step": {
    "data": {
      "slug": "address",
      "type": "form",
      "friendlyname": "Endereço",
      "sharedata": true,
      "fields": [
        {
          "slug": "zipcode",
          "ui:widget": "CEP",
          "ui:props-preset": "br-cep",
          "ui:props": {
            "relatedFieldsSlugs": {
              "cityFieldSlug": "city",
              "stateFieldSlug": "state",
              "streetFieldSlug": "street_address",
              "additionalAddressFieldSlug": "additional_info",
              "neighborhoodFieldSlug": "neighborhood",
            },
          },
          "validators": [
            {
              "type": "required",
            },
            {
              "type": "cep",
            },
          ],
          "value": "13224-410",
        },
        {
          "slug": "state",
          "ui:widget": "Select",
          "ui:props-preset": "br-states",
          "ui:props": {
            "label": "Estado",
          },
          "validators": [
            {
              "type": "required",
            },
          ],
          "meta": {},
          "value": "BR-SP",
        },
        {
          "slug": "city",
          "ui:widget": "BRCity",
          "ui:props": {
            "label": "Cidade",
            "stateFieldSlug": "state",
          },
          "validators": [
            {
              "type": "required",
            },
            {
              "type": "nonNumeric",
            },
          ],
          "meta": {},
          "value": "Várzea Paulista",
        },
        {
          "slug": "street_address",
          "ui:widget": "Text",
          "ui:props": {
            "label": "Endereço",
            "placeholder": "Ex.: Av Paulista",
          },
          "validators": [
            {
              "type": "required",
            },
          ],
          "value": "Rua Artibano Murari",
        },
        {
          "slug": "street_number",
          "ui:widget": "Number",
          "ui:props": {
            "label": "Número",
          },
          "validators": [
            {
              "type": "required",
            },
          ],
          "meta": {},
          "value": "123",
        },
        {
          "slug": "additional_info",
          "ui:widget": "Text",
          "ui:props": {
            "label": "Complemento",
            "placeholder": "Ex.: Apto 25 bl C",
          },
          "meta": {},
        },
        {
          "slug": "neighborhood",
          "ui:widget": "Text",
          "ui:props": {
            "label": "Bairro",
            "placeholder": "Ex.: Centro",
            "readonly": true,
          },
          "validators": [
            {
              "type": "required",
            },
          ],
          "meta": {},
          "value": "Jardim Cruz Alta",
        },
      ],
    },
    "position": 3,
  },
  "meta": {
    "lastStep": "invoice_expiration",
    "forms": [
      {
        "position": 1,
        "slug": "personal_data_1",
        "friendlyname": "Dados pessoais",
      },
      {
        "position": 2,
        "slug": "personal_data_2",
        "friendlyname": "Dados complementares",
      },
      {
        "position": 3,
        "slug": "address",
        "friendlyname": "Endereço",
      },
      {
        "position": 4,
        "slug": "occupation",
        "friendlyname": "Dados Profissionais",
      },
      {
        "position": 5,
        "slug": "personal_documents",
        "friendlyname": "Documentos",
      },
      {
        "position": 6,
        "slug": "invoice_expiration",
        "friendlyname": "Personalização do cartão",
      },
    ],
  },
  "auth":
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfaWQiOiI0ZmQxYjZkNi1hOGQzLTQ3NmQtYmFhNy0yOWNkNjg4MzAzOTkiLCJpYXQiOjE2NDQ0MzU1MTV9._3Vqg3fMu_jECU-zSasAX_feUPn93QcZeDPN1BWM9bA",
}

export default nextStepWithPropsPresets
