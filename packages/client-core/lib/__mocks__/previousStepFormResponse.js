const previousStepFormResponse = {
  message: "ok",
  data: {
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
          value: "cenoura batata",
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
          value: "teste@teste.com",
        },
      ],
    },
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
    auth: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfaWQiOiI2NzkyMTQ0MC01ZDljLTQwMmUtYTI4Yi0wZjJkOGRkNjRiZjYiLCJpYXQiOjE2MzU4NzI4NTV9.7y5GR8_1acwQ5UdttHJK0_LIoMze4COpcwy6bs4ovH4",
    capturedData: {
      updatedAt: 1635886706658,
      business: "sample",
      partner: "sample",
      full_name: "cenoura batata",
      id: "67921440-5d9c-402e-a28b-0f2d8dd64bf6",
      email: "teste@teste.com",
    },
  },
};


export default previousStepFormResponse
