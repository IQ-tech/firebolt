const nextStepWithPropsPresets = {
  message: "ok",
  formData: {
    auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfaWQiOiI2NzkyMTQ0MC01ZDljLTQwMmUtYTI4Yi0wZjJkOGRkNjRiZjYiLCJpYXQiOjE2MzU4NzI4NTV9.7y5GR8_1acwQ5UdttHJK0_LIoMze4COpcwy6bs4ovH4",
    meta: {
      lastStep: 5,
      forms: [
        {
          position: 1,
          slug: "personal_data",
          friendlyName: "Vamos começar",
        },
        {
          position: 2,
          slug: "documents",
          friendlyName: "Documentos",
        },
        {
          position: 3,
          slug: "address",
          friendlyName: "Endereço",
        },
        {
          position: 4,
          slug: "bills",
          friendlyName: "Adicionar Contas",
        },
        {
          position: 5,
          slug: "token",
          friendlyName: "Token",
        },
      ],
    },
    capturedData: {},
    step: {
      data: {
        id: 1,
        slug: "personal_data",
        type: "form",
        friendlyName: "Vamos começar",
        fields: [
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
      position: 1,
    },
  },
  errorData: {},
}

export default nextStepWithPropsPresets
