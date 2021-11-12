const startFormResponse = {
  message: "ok",
  formData: {
    auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfaWQiOiIyNWFiMjRlNS1hODI1LTQzM2EtYmI4OS0wMjJhMGMzY2IzYmQiLCJpYXQiOjE2MzYwNTk5Nzl9.w7ESWLVXeXkIDJpbOToD2azjUiCF1gdaf6ZIy8Tlb1s",
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
              label: "E-mail",
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
            slug: "my-doc",
            "ui:widget": "Upload",
            "ui:props": {
              label: "My file",
              placeholder: "get files",
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
      position: 1,
    },
  },
  errorData: {},
};

export default startFormResponse;
