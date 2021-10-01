const fields = [
  {
    'slug': 'bank_name',
    'component': 'select',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'label': 'Banco',
      'options': [
        {
          'value': 'Bradesco',
          'label': 'bradesco',
        },
        {
          'value': 'Caixa',
          'label': 'caixa',
        },
        {
          'value': 'Itaú',
          'label': 'itau',
        },
        {
          'value': 'Santander',
          'label': 'santander',
        },
      ],
    },
  },
  {
    'slug': 'bank_account_type',
    'component': 'bankAccount',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'relatedFields': {
        'bankSelected': 'bank_name',
      },
      'relatedOptions': {
        'bankSelected': {
          'Caixa': [
            {
              'value': '001',
              'label': 'Conta corrente - 001',
            },
            {
              'value': '013',
              'label': 'Conta poupança - 013',
            },
            {
              'value': '023',
              'label': 'Conta simplificada - 023',
            },
          ],
        },
      },
    },
  },
  {
    'slug': 'bank_branch',
    'component': 'number',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'label': 'Sua agência',
    },
  },
  {
    'slug': 'bank_account_number',
    'component': 'number',
    'validators': [
      {
        'type': 'required',
      },
      {
        'type': 'bankAccountNumber',
        'properties': {
          'bankBranch': 'field-value:bank_branch',
          'bankSlug': 'field-value:bank_name',
          'accountType': 'field-value:bank_account_type',
        },
      },
    ],
    'meta': {
      'label': 'Sua conta com digíto',
      'placeholder': 'Com digíto',
    },
  },
];

const payload = {
  'bank_name': 'itau',
  'bank_account_type': '001',
  'bank_branch': '6200',
  'bank_account_number': '01894-0',
};

export default { payload, fields };
