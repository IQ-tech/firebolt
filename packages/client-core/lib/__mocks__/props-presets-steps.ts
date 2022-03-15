export const customCollection = {
  name: "specific-docs",
  presets: {
    "cod": {
      label: "Press F to pay respects",
      placeholder: "write something",
      batata: "batata",
    },
    "bat": {
      "label": "i'm batman",
      "placeholder": "bat placeholder",
      "cenoura": "cenoura"
    }
  }
 }


export const secondCollection = {
  name: "second-preset-collection",
  presets: {
    "buiu": {
      label: "Buiu",
      placeholder: "potato"
    },
    "cod": {
      label: "second collection cod",
      placeholder: "second collection cod",
      "cebola": "cebola"
    }
  }
}


export const getRequestMock = (preset = "cod") => ({
  message: "ok",
  formData: {
    step: {
      data: {
        slug: "personal_data",
        type: "form",
        friendlyName: "Vamos começar",
        fields: [
          {
            slug: "full_name",
            "ui:widget": "Text",
            "ui:props-preset": preset,
            "ui:props": {
              label: "Nome completo",
              placeholder: "Nome completo",
            },
            validators: [],
            meta: {},
          },
        ],
      },
      position: 1,
    }
  }
  })

