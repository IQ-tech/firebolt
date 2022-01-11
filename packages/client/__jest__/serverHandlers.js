import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://api.com.br/form/testing", (req, res, ctx) => {
    return res(
      ctx.json({
        message: "ok",
        formData: {
          auth: "",
          meta: {
            lastStep: "documents",
            forms: [
              {
                position: 1,
                slug: "personal_data",
                friendlyname: "Vamos começar",
              },
              {
                position: 2,
                slug: "documents",
                friendlyname: "Documentos",
              },
            ],
          },
          capturedData: {},
          step: {
            data: {
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
                },
              ],
            },
            position: 1,
          },
        },
        errorData: {},
      })
    );
  }),
  rest.post("http://api.com.br/form/testing/next", (req, res, ctx) => {
    return res(
      ctx.json({
        message: "ok",
        formData: {
          auth: "",
          meta: {
            lastStep: "documents",
            forms: [
              {
                position: 1,
                slug: "personal_data",
                friendlyname: "Vamos começar",
              },
              {
                position: 2,
                slug: "documents",
                friendlyname: "Documentos",
              },
            ],
          },
          capturedData: {},
          step: {
            data: {
              id: 2,
              slug: "documents",
              type: "form",
              friendlyname: "Documentos",
              fields: [
                {
                  slug: "email",
                  "ui:widget": "Email",
                  "ui:props": {
                    label: "Email",
                    placeholder: "contato@email.com",
                  },
                },
              ],
            },
            position: 1,
          },
        },
        errorData: {},
      })
    );
  }),
  rest.get(
    "http://api.com.br/form/testing/personal_data/previous",
    (req, res, ctx) => {
      return res(ctx.json({}));
    }
  ),
  rest.get("http://api.com.br/debug/testing/personal_data", (req, res, ctx) => {
    return res(
      ctx.json({
        message: "ok",
        formData: {
          auth: "",
          meta: {
            lastStep: "documents",
            forms: [
              {
                position: 1,
                slug: "personal_data",
                friendlyname: "Vamos começar",
              },
            ],
          },
          capturedData: {},
          step: {
            data: {
              id: 2,
              slug: "documents",
              type: "form",
              friendlyname: "Debug - Documentos",
              fields: [
                {
                  slug: "email",
                  "ui:widget": "Email",
                  "ui:props": {
                    label: "Email",
                    placeholder: "contato@email.com",
                  },
                },
              ],
            },
            position: 1,
          },
        },
        errorData: {},
      })
    );
  })
);

export default server;
