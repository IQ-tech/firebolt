const startFormResponse = {
  message: "ok",
  data: {
    auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfaWQiOiI2NzkyMTQ0MC01ZDljLTQwMmUtYTI4Yi0wZjJkOGRkNjRiZjYiLCJpYXQiOjE2MzU4NzI4NTV9.7y5GR8_1acwQ5UdttHJK0_LIoMze4COpcwy6bs4ovH4",
    meta: {
      laststep: 5,
      forms: [
        {
          id: 1,
          slug: "personal_data",
          friendlyname: "Vamos começar",
        },
        {
          id: 2,
          slug: "documents",
          friendlyname: "Documentos",
        },
        {
          id: 3,
          slug: "address",
          friendlyname: "Endereço",
        },
        {
          id: 4,
          slug: "bills",
          friendlyname: "Adicionar Contas",
        },
        {
          id: 5,
          slug: "token",
          friendlyname: "Token",
        },
      ],
    },
    capturedData: {},
    step: {
      id: 1,
      slug: "personal_data",
      type: "form",
      friendlyname: "Vamos começar",
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
      ],
    },
  },
};


export default startFormResponse
