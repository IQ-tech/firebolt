const startFormResponse = {
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
            slug: "full_name",
            "ui:widget": "Text",
            "ui:props": {
              label: "Nome completo",
              placeholder: "Nome completo",
            },
            validators: [
              {
                type: "required",
              },
              {
                type: "name",
              },
            ],
            meta: {},
          },
          {
            slug: "email",
            "ui:widget": "Email",
            "ui:props": {
              label: "Email",
              placeholder: "contato@email.com",
            },
            validators: [
              {
                type: "required",
              },
              {
                type: "email",
              },
            ],
            meta: {},
          },
          {
            slug: "email klingon",
            "ui:widget": "Email",
            "ui:props-preset": "email:Transmorfers",
            "ui:props": {},
            validators: [
              {
                type: "required",
              },
              {
                type: "email",
              },
            ],
            meta: {},
          },
        ],
      },
      position: 1,
    },
  },
  errorData: {},
};

export default startFormResponse;
