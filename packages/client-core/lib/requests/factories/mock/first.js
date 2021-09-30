export const stepOne = {
  "message": "ok",
  "data": {
    "meta": {
      "laststep": 7,
      "forms": [
        {
          "id": 1,
          "friendlyname": "Vamos começar",
        },
        {
          "id": 2,
          "friendlyname": "Dados pessoais",
        },
        {
          "id": 3,
          "friendlyname": "Documentos",
        },
        {
          "id": 4,
          "friendlyname": "Endereço",
        },
        {
          "id": 5,
          "friendlyname": "Emprego e Renda",
        },
        {
          "id": 6,
          "friendlyname": "Conta bancária",
        },
        {
          "id": 7,
          "friendlyname": "Adicionar Contas",
        },
      ],
    },
    "nextstep": {
      "step": {
        "id": 1,
        "type": "form",
        "friendlyname": "Vamos começar",
        "fields": [
          {
            "slug": "full_name",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Nome completo",
              "placeholder": "Nome completo",
            },
            "validators": [{ "type": "required" }, { "type": "name" }],
            "meta": {},
          },
          {
            "slug": "cebola",
            "conditional": "step.full_name === 'cebola frita'",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Conditional field",
            },
            "validators": [{ "type": "required" }],
          },
          {
            "slug": "email",
            "ui:widget": "Email",
            "ui:props": {
              "label": "Email",
              "placeholder": "example@gmail.com",
            },
            "validators": [{ "type": "required" }, { "type": "email" }],
            "meta": {},
          },
          {
            "slug": "cpf",
            "ui:widget": "Text",
            "ui:props-preset": "br-cpf",
            "validators": [{ "type": "required" }, { "type": "cpf" }],
            "meta": {},
          },
          {
            "slug": "main_phone",
            "ui:widget": "Text",
            "ui:props-preset": "br-phone",
            "validators": [{ "type": "required" }, { "type": "phone" }],
            "meta": {},
          },
          {
            "slug": "date_of_birth",
            "ui:widget": "Text",
            "ui:props-preset": "day-month-year",
            "ui:props": {
              "label": "Data de Nascimento",
            },
            "validators": [{ "type": "required" }, { "type": "date" }],
            "meta": {},
          },
          {
            "slug": "requested_loan_amount",
            "ui:widget": "hidden",
            "validators": [
              {
                "type": "required",
              },
            ],
          },
          {
            "slug": "requested_loan_duration",
            "ui:widget": "hidden",
            "validators": [
              {
                "type": "required",
              },
            ],
          },
        ],
      },
    },
  },
}

export const stepTwo = {
  "message": "ok",
  "data": {
    "meta": {
      "laststep": 7,
      "forms": [
        {
          "id": 1,
          "friendlyname": "Vamos começar",
        },
        {
          "id": 2,
          "friendlyname": "Dados pessoais",
        },
        {
          "id": 3,
          "friendlyname": "Documentos",
        },
        {
          "id": 4,
          "friendlyname": "Endereço",
        },
        {
          "id": 5,
          "friendlyname": "Emprego e Renda",
        },
        {
          "id": 6,
          "friendlyname": "Conta bancária",
        },
        {
          "id": 7,
          "friendlyname": "Adicionar Contas",
        },
      ],
    },
    "nextstep": {
      "step": {
        "id": 2,
        "type": "form",
        "friendlyname": "Dados pessoais",

        "fields": [
          {
            "slug": "gender",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Gênero",
              "options": [
                {
                  "value": "male",
                  "label": "Masculino",
                },
                {
                  "value": "female",
                  "label": "Feminino",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "is_universitary",
            "ui:widget": "Check",
            "ui:props": {
              "label": "Sou universitário",
            },
          },
          {
            "slug": "important_doc",
            "ui:widget": "Upload",
            "ui:props": {
              "label": "Adicione o seu arquivo",
              "allowedExtensions": ["json", "png"],
              "maxFiles": 4,
              "uploadEndpoint":
                "https://api-dsv.iq360.com.br/loans/partners/v1/webhooks/proposals/uploads",
            },
          },
          {
            "slug": "marital_status",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Estado civil",
              "options": [
                {
                  "value": "single",
                  "label": "Solteiro(a)",
                },
                {
                  "value": "married",
                  "label": "Casado(a)",
                },
                {
                  "value": "divorced",
                  "label": "Divorciado(a)/Separado(a)",
                },
                {
                  "value": "widowed",
                  "label": "Viúvo(a)",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "person_genre",
            "ui:widget": "Radio",
            "ui:props": {
              "options": [
                { "value": "M", "label": "Male" },
                { "value": "F", "label": "Female" },
              ],
            },
          },
          {
            "slug": "My_options",
            "ui:widget": "CheckboxGroup",
            "ui:props": {
              "label": "My options",
              "options": [
                { "value": "something", "label": "something" },
                { "value": "somethingnew", "label": "somethingnew" },
                { "value": "somethingThree", "label": "somethingThree" },
              ],
            },
          },
          {
            "slug": "mothers_name",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Nome completo da mãe",
              "placeholder": "",
            },
            "validators": [
              {
                "type": "required",
              },
              {
                "type": "name",
              },
            ],
            "meta": {},
          },
          {
            "slug": "educational_level",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Escolaridade",
              "options": [
                {
                  "value": "no education",
                  "label": "Nível Básico",
                },
                {
                  "value": "some high School",
                  "label": "Primeiro Grau Completo",
                },
                {
                  "value": "high School diploma",
                  "label": "Segundo Grau Completo",
                },
                {
                  "value": "college",
                  "label": "Superior Completo",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
        ],
      },
    },
  },
}

export const stepThree = {
  "message": "ok",
  "data": {
    "meta": {
      "laststep": 7,
      "forms": [
        {
          "id": 1,
          "friendlyname": "Vamos começar",
        },
        {
          "id": 2,
          "friendlyname": "Dados pessoais",
        },
        {
          "id": 3,
          "friendlyname": "Documentos",
        },
        {
          "id": 4,
          "friendlyname": "Endereço",
        },
        {
          "id": 5,
          "friendlyname": "Emprego e Renda",
        },
        {
          "id": 6,
          "friendlyname": "Conta bancária",
        },
        {
          "id": 7,
          "friendlyname": "Adicionar Contas",
        },
      ],
    },
    "nextstep": {
      "step": {
        "id": 3,
        "type": "form",
        "friendlyname": "Documentos",
        "fields": [
          {
            "slug": "brazil_id_issuer",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Tipo de documento",
              "options": [
                {
                  "value": "RG (SSP ou IFP)",
                  "label": "RG (SSP ou IFP)",
                },
                {
                  "value": "Carteira de Motorista (DETRAN)",
                  "label": "Carteira de Motorista (DETRAN)",
                },
                {
                  "value":
                    "Documento Militar ou Polícia Federal (DPF, MMA, MEX, MAE)",
                  "label":
                    "Documento Militar ou Polícia Federal (DPF, MMA, MEX, MAE)",
                },
                {
                  "value":
                    "Conselhos de Classe (OAB, CRM, CREA, CRC, CRA, outros)",
                  "label":
                    "Conselhos de Classe (OAB, CRM, CREA, CRC, CRA, outros)",
                },
                {
                  "value": "Registro Nacional Estrangeiro (RNE)",
                  "label": "Registro Nacional Estrangeiro (RNE)",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "brazil_id_number",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Número do documento",
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "brazil_id_issued_on",
            "ui:widget": "Text",
            "ui:props-preset": "day-month-year",
            "ui:props": {
              "label": "Data de emissão",
            },
            "validators": [
              {
                "type": "required",
              },
              {
                "type": "date",
              },
            ],
          },
          {
            "slug": "brazil_id_region",
            "ui:widget": "Select",
            "ui:props-preset": "br-states",
            "ui:props": {
              "label": "Estado Emissor",
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "nationality",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Nacionalidade",
              "options": [
                {
                  "value": "BR",
                  "label": "Brasil",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "birth_region",
            "ui:widget": "Select",
            "ui:props-preset": "br-states",
            "ui:props": {
              "label": "Naturalidade",
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
        ],
      },
    },
  },
}

export const stepFour = {
  "message": "ok",
  "data": {
    "meta": {
      "laststep": 7,
      "forms": [
        {
          "id": 1,
          "friendlyname": "Vamos começar",
        },
        {
          "id": 2,
          "friendlyname": "Dados pessoais",
        },
        {
          "id": 3,
          "friendlyname": "Documentos",
        },
        {
          "id": 4,
          "friendlyname": "Endereço",
        },
        {
          "id": 5,
          "friendlyname": "Emprego e Renda",
        },
        {
          "id": 6,
          "friendlyname": "Conta bancária",
        },
        {
          "id": 7,
          "friendlyname": "Adicionar Contas",
        },
      ],
    },
    "nextstep": {
      "step": {
        "id": 4,
        "type": "form",
        "friendlyname": "Endereço",
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
          },
          {
            "slug": "street_address",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Endereço",
              "placeholder": "Ex.: Av Paulista",
              "readonly": true,
            },
            "validators": [
              {
                "type": "required",
              },
            ],
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
              {
                "type": "nonNumeric",
              },
            ],
            "meta": {},
          },
          {
            "slug": "state",
            "ui:widget": "Select",
            "ui:props-preset": "br-states",
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "city",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Cidade",
              "readonly": true,
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
          },
          {
            "slug": "time_at_address",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Tempo na residência",
              "options": [
                {
                  "value": "less_than_1_month",
                  "label": "Menos de 1 mês",
                },
                {
                  "value": "1_month",
                  "label": "1 mês",
                },
                {
                  "value": "2_months",
                  "label": "2 meses",
                },
                {
                  "value": "3_months",
                  "label": "3 meses",
                },
                {
                  "value": "4_to_6_months",
                  "label": "4 a 6 meses",
                },
                {
                  "value": "7_months_to_1_year",
                  "label": "7 a 12 meses",
                },
                {
                  "value": "1_year_to_2_years",
                  "label": "1 ano a 2 anos",
                },
                {
                  "value": "more_than_2_years",
                  "label": "Mais de 2 anos",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "residence_type",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Tipo de residencia",
              "options": [
                {
                  "value": "own",
                  "label": "Própria",
                },
                {
                  "value": "rent",
                  "label": "Alugada",
                },
                {
                  "value": "family",
                  "label": "Familiares",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "home_phone",
            "ui:widget": "Text",
            "ui:props-preset": "br-phone-hybrid",
            "validators": [
              {
                "type": "phone",
              },
            ],
            "meta": {},
          },
        ],
      },
    },
  },
}

export const stepFive = {
  "message": "ok",
  "data": {
    "meta": {
      "laststep": 7,
      "forms": [
        {
          "id": 1,
          "friendlyname": "Vamos começar",
        },
        {
          "id": 2,
          "friendlyname": "Dados pessoais",
        },
        {
          "id": 3,
          "friendlyname": "Documentos",
        },
        {
          "id": 4,
          "friendlyname": "Endereço",
        },
        {
          "id": 5,
          "friendlyname": "Emprego e Renda",
        },
        {
          "id": 6,
          "friendlyname": "Conta bancária",
        },
        {
          "id": 7,
          "friendlyname": "Adicionar Contas",
        },
      ],
    },
    "nextstep": {
      "step": {
        "id": 5,
        "type": "form",
        "friendlyname": "Emprego e Renda",
        "fields": [
          {
            "slug": "income_source",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Fonte de renda",
              "options": [
                {
                  "value": "Full-time",
                  "label": "Funcionário com Carteira Assinada (CLT)",
                },
                {
                  "value": "Government",
                  "label": "Funcionário Público ou Militar",
                },
                {
                  "value": "Self-employed",
                  "label": "Profissional Autônomo",
                },
                {
                  "value": "Informal",
                  "label": "Informal ou Não Registrado",
                },
                {
                  "value": "Retired",
                  "label": "Aposentado ou Pensionista",
                },
                {
                  "value": "Other",
                  "label": "Outros",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "time_at_job",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Tempo no emprego atual",
              "options": [
                {
                  "value": "less_than_1_month",
                  "label": "Menos de 1 mês",
                },
                {
                  "value": "1_to_3_months",
                  "label": "1 a 3 meses",
                },
                {
                  "value": "4_to_6_months",
                  "label": "4 a 6 meses",
                },
                {
                  "value": "6_months_to_1_year",
                  "label": "6 meses a 1 ano",
                },
                {
                  "value": "1_year_to_2_years",
                  "label": "1 ano a 2 anos",
                },
                {
                  "value": "more_than_2_years",
                  "label": "Mais de 2 anos",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "monthly_income",
            "ui:widget": "Text",
            "ui:props-preset": "br-currency",
            "ui:props": {
              "label": "Renda líquida mensal comprovada",
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "income_payment_method",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Como você recebe seu pagamento? ",
              "options": [
                {
                  "value": "cash",
                  "label": "Dinheiro",
                },
                {
                  "value": "check",
                  "label": "Cheque",
                },
                {
                  "value": "direct_deposit",
                  "label": "Depósito em conta corrente",
                },
                {
                  "value": "debit_card",
                  "label": "Cartão magnético",
                },
                {
                  "value": "other",
                  "label": "Outros",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "paydate_ordinal",
            "ui:widget": "Select",
            "ui:props-preset": "month-day-options",
            "ui:props": {
              "label": "Que dia você recebe seu pagamento?",
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "net_worth",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Patrimônio",
              "options": [
                {
                  "value": "I do not have any assets",
                  "label": "Não possuo patrimônio",
                },
                {
                  "value": "My assets are worth less than R$ 10.000,00",
                  "label": "Até R$ 10.000,00",
                },
                {
                  "value":
                    "My assets are worth between R$ 10.000,00 and R$ 50.000,00",
                  "label": "Entre R$ 10.000,00 e R$ 50.000,00",
                },
                {
                  "value": "Over R$ 50.000,00",
                  "label": "Acima de R$ 50.000,00",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "loan_purpose",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Objetivo do Empréstimo",
              "options": [
                {
                  "value": "pay_other_debts",
                  "label": "Pagar Outras Dívidas",
                },
                {
                  "value": "pay_bills",
                  "label": "Pagar Contas",
                },
                {
                  "value": "shopping",
                  "label": "Fazer Compras",
                },
                {
                  "value": "home_payment",
                  "label": "Reformar a Casa ou Pagar Mudança",
                },
                {
                  "value": "car_payment",
                  "label": "Comprar ou Consertar um Carro",
                },
                {
                  "value": "medical_payment",
                  "label": "Tratamento Médico",
                },
                {
                  "value": "new_business",
                  "label": "Começar um Novo Negócio",
                },
                {
                  "value": "help_a_family_member",
                  "label": "Ajudar uma outra Pessoa da Família",
                },
                {
                  "value": "other",
                  "label": "Outros",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
        ],
      },
    },
  },
}

export const stepSix = {
  "message": "ok",
  "data": {
    "meta": {
      "laststep": 7,
      "forms": [
        {
          "id": 1,
          "friendlyname": "Vamos começar",
        },
        {
          "id": 2,
          "friendlyname": "Dados pessoais",
        },
        {
          "id": 3,
          "friendlyname": "Documentos",
        },
        {
          "id": 4,
          "friendlyname": "Endereço",
        },
        {
          "id": 5,
          "friendlyname": "Emprego e Renda",
        },
        {
          "id": 6,
          "friendlyname": "Conta bancária",
        },
        {
          "id": 7,
          "friendlyname": "Adicionar Contas",
        },
      ],
    },
    "nextstep": {
      "step": {
        "id": 6,
        "type": "form",
        "friendlyname": "Conta bancária",
        "fields": [
          {
            "slug": "bank_name",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Banco",
              "options": [
                {
                  "value": "Bradesco",
                  "label": "Bradesco",
                },
                {
                  "value": "Caixa",
                  "label": "Caixa",
                },
                {
                  "value": "Itaú",
                  "label": "Itaú",
                },
                {
                  "value": "Santander",
                  "label": "Santander",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "bank_account_type",
            "ui:widget": "Select",
            "ui:props-preset": "br-bank-account-type",
            "ui:props": {
              "label": "Tipo da conta",
              "options": [
                { value: "corrente", label: "Conta Corrente Individual - 01" },
                { value: "poupança", label: "Conta Poupança Individual - 02" },
              ],
            },
            "ui:props-conditional": [
              {
                "conditional": "step.bank_name === 'Caixa'",
                "props": {
                  "options": [
                    {
                      "value": "001",
                      "label": "Conta corrente - 001",
                    },
                    {
                      "value": "013",
                      "label": "Conta poupança - 013",
                    },
                    {
                      "value": "023",
                      "label": "Conta simplificada - 023",
                    },
                  ],
                },
              },
            ],
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "bank_branch",
            "ui:widget": "Number",
            "ui:props": { "label": "Sua agência" },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "bank_account_number",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Sua conta com digíto",
              "placeholder": "Com digíto",
            },
            "validators": [
              {
                "type": "required",
              },
              {
                "type": "bankAccountNumber",
                "properties": {
                  "bankBranch": "field-value:bank_branch",
                  "bankSlug": "field-value:bank_name",
                  "accountType": "field-value:bank_account_type",
                },
              },
            ],
          },
          {
            "slug": "card_password",
            "ui:widget": "Password",
            "ui:props": {
              "label": "Senha numérica do cartão",
            },
            "validators": [
              {
                "type": "required",
              },
              {
                "type": "numeric",
              },
              {
                "type": "textCharsLength",
                "properties": {
                  "exact": 4,
                },
              },
              {
                "type": "nonRepeatedChars",
              },
              {
                "type": "nonSequentialCharacters",
              },
            ],
            "meta": {},
          },
          {
            "slug": "card_password_confirmation",
            "ui:widget": "Password",
            "ui:props": {
              "label": "Confirmar senha numérica do cartão",
            },
            "validators": [
              {
                "type": "required",
              },
              {
                "type": "numeric",
              },
              {
                "type": "textCharsLength",
                "properties": {
                  "exact": 4,
                },
              },
              {
                "type": "nonSequentialCharacters",
              },
              {
                "type": "sameValue",
                "properties": {
                  "valueToCompare": "field-value:card_password",
                },
              },
              {
                "type": "nonRepeatedChars",
              },
            ],
            "meta": {},
          },
        ],
      },
    },
  },
}

export const stepState = {
  "message": "ok",
  "data": {
    "meta": {
      "laststep": 7,
      "forms": [
        {
          "id": 1,
          "friendlyname": "Vamos começar",
        },
        {
          "id": 2,
          "friendlyname": "Dados pessoais",
        },
        {
          "id": 3,
          "friendlyname": "Documentos",
        },
        {
          "id": 4,
          "friendlyname": "Endereço",
        },
        {
          "id": 5,
          "friendlyname": "Emprego e Renda",
        },
        {
          "id": 6,
          "friendlyname": "Conta bancária",
        },
        {
          "id": 7,
          "friendlyname": "Adicionar Contas",
        },
      ],
    },
    "nextstep": {
      "step": {
        "id": 4,
        "type": "form",
        "friendlyname": "Endereço",
        "fields": [
          {
            "slug": "street_address",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Endereço",
              "placeholder": "Ex.: Av Paulista",
              "readonly": true,
            },
            "validators": [
              {
                "type": "required",
              },
            ],
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
              {
                "type": "nonNumeric",
              },
            ],
            "meta": {},
          },
          {
            "slug": "state",
            "ui:widget": "Select",
            "ui:props-preset": "br-states",
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "city",
            "ui:widget": "BRCity",
            "ui:props": {
              "label": "Cidade",
              "stateFieldSlug": "state",
              /* "stateFormat": "number", */
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
          },
          {
            "slug": "time_at_address",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Tempo na residência",
              "options": [
                {
                  "value": "less_than_1_month",
                  "label": "Menos de 1 mês",
                },
                {
                  "value": "1_month",
                  "label": "1 mês",
                },
                {
                  "value": "2_months",
                  "label": "2 meses",
                },
                {
                  "value": "3_months",
                  "label": "3 meses",
                },
                {
                  "value": "4_to_6_months",
                  "label": "4 a 6 meses",
                },
                {
                  "value": "7_months_to_1_year",
                  "label": "7 a 12 meses",
                },
                {
                  "value": "1_year_to_2_years",
                  "label": "1 ano a 2 anos",
                },
                {
                  "value": "more_than_2_years",
                  "label": "Mais de 2 anos",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "residence_type",
            "ui:widget": "Select",
            "ui:props": {
              "label": "Tipo de residencia",
              "options": [
                {
                  "value": "own",
                  "label": "Própria",
                },
                {
                  "value": "rent",
                  "label": "Alugada",
                },
                {
                  "value": "family",
                  "label": "Familiares",
                },
              ],
            },
            "validators": [
              {
                "type": "required",
              },
            ],
            "meta": {},
          },
          {
            "slug": "home_phone",
            "ui:widget": "Text",
            "ui:props-preset": "br-phone-hybrid",
            "validators": [
              {
                "type": "phone",
              },
            ],
            "meta": {},
          },
        ],
      },
    },
  },
}
