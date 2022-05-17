const nextStepFormResponse = {
  "message": "ok",
  "formData": {
    "step": {
      "data": {
        "id": 2,
        "slug": "documents",
        "type": "form",
        "friendlyName": "Documentos",
        "fields": [
          {
            "slug": "brazil_id_number",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Número do documento"
            },
            "validators": [
              {
                "type": "required"
              }
            ],
            "meta": {}
          }
        ]
      },
      "position": 2,
      "webhookResult": {
        "preventContinue": false,
        "errorSlugField": "",
        "errorMessage": ""
      }
    },
    "meta": {
      "lastStep": 5,
      "forms": [
        {
          "position": 1,
          "slug": "personal_data",
          "friendlyName": "Vamos começar"
        },
        {
          "position": 2,
          "slug": "documents",
          "friendlyName": "Documentos"
        },
        {
          "position": 3,
          "slug": "address",
          "friendlyName": "Endereço"
        },
        {
          "position": 4,
          "slug": "bills",
          "friendlyName": "Adicionar Contas"
        },
        {
          "position": 5,
          "slug": "token",
          "friendlyName": "Token"
        }
      ]
    },
    "auth": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfaWQiOiJhYjY0OWE4NC1mNTMyLTQ2NmEtYjRkNC1jZjE1NzY5YjM4Y2EiLCJpYXQiOjE2MzY2NTY1MzN9.EC65IqDQkmMXgSxHyf_moMhcHsVxRDlwoRYiF4Cm0AU",
    "capturedData": {
      "updatedAt": 1636656605584,
      "business": "sample",
      "partner": "sample",
      "full_name": "test asdsf",
      "id": "ab649a84-f532-466a-b4d4-cf15769b38ca",
      "email": "asdf@gmail.com"
    }
  },
  "errorData": {}
}

export default nextStepFormResponse;
