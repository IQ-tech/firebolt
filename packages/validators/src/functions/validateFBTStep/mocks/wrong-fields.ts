import { FieldConfig } from '../../../types';

const fields: FieldConfig[] = [
  {
    'slug': 'zipcode',
    'component': 'cep',
    'validators': [
      {
        'type': 'required',
      },
      {
        'type': 'cep',
      },
    ],
    'meta': {
      'relatedFields': {
        'city': 'city',
        'state': 'state',
        'street': 'street_address',
        'additional': 'additional_info',
        'neighborhood': 'neighborhood',
      },
    },
  },
  {
    'slug': 'street_address',
    'component': 'text',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'label': 'Endereço',
      'placeholder': 'Ex.: Av Paulista',
      'readonly': true,
    },
  },
  {
    'slug': 'street_number',
    'component': 'number',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'label': 'Número',
    },
  },
  {
    'slug': 'additional_info',
    'component': 'text',
    'meta': {
      'label': 'Complemento (opcional)',
      'placeholder': 'Ex.: Apto 25 bl C',
    },
  },
  {
    'slug': 'neighborhood',
    'component': 'text',
    'validators': [
      {
        'type': 'required',
      },
      {
        'type': 'nonNumeric',
      },
    ],
    'meta': {
      'label': 'Bairro',
      'placeholder': 'Ex.: Centro',
      'readonly': true,
    },
  },
  {
    'slug': 'city',
    'component': 'text',
    'validators': [
      {
        'type': 'required',
      },
      {
        'type': 'nonNumeric',
      },
    ],
    'meta': {
      'label': 'Cidade',
      'readonly': true,
    },
  },
  {
    'slug': 'state',
    'component': 'select',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'label': 'Estado',
      'readonly': true,
      'options': [
        {
          'value': 'BR-AC',
          'label': 'Acre',
        },
        {
          'value': 'BR-AL',
          'label': 'Alagoas',
        },
        {
          'value': 'BR-AP',
          'label': 'Amapá',
        },
        {
          'value': 'BR-AM',
          'label': 'Amazonas',
        },
        {
          'value': 'BR-BA',
          'label': 'Bahia',
        },
        {
          'value': 'BR-CE',
          'label': 'Ceará',
        },
        {
          'value': 'BR-DF',
          'label': 'Distrito Federal',
        },
        {
          'value': 'BR-ES',
          'label': 'Espírito Santo',
        },
        {
          'value': 'BR-GO',
          'label': 'Goiás',
        },
        {
          'value': 'BR-MA',
          'label': 'Maranhão',
        },
        {
          'value': 'BR-MT',
          'label': 'Mato Grosso',
        },
        {
          'value': 'BR-MS',
          'label': 'Mato Grosso do Sul',
        },
        {
          'value': 'BR-MG',
          'label': 'Minas Gerais',
        },
        {
          'value': 'BR-PA',
          'label': 'Pará',
        },
        {
          'value': 'BR-PB',
          'label': 'Paraíba',
        },
        {
          'value': 'BR-PR',
          'label': 'Paraná',
        },
        {
          'value': 'BR-PE',
          'label': 'Pernambuco',
        },
        {
          'value': 'BR-PI',
          'label': 'Piauí',
        },
        {
          'value': 'BR-RJ',
          'label': 'Rio de Janeiro',
        },
        {
          'value': 'BR-RN',
          'label': 'Rio Grande do Norte',
        },
        {
          'value': 'BR-RS',
          'label': 'Rio Grande do Sul',
        },
        {
          'value': 'BR-RO',
          'label': 'Rondônia',
        },
        {
          'value': 'BR-RR',
          'label': 'Roraima',
        },
        {
          'value': 'BR-SC',
          'label': 'Santa Catarina',
        },
        {
          'value': 'BR-SP',
          'label': 'São Paulo',
        },
        {
          'value': 'BR-SE',
          'label': 'Sergipe',
        },
        {
          'value': 'BR-TO',
          'label': 'Tocantins',
        },
      ],
    },
  },
  {
    'slug': 'time_at_address',
    'component': 'select',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'label': 'Tempo na residencia',
      'options': [
        {
          'value': 'less_than_1_month',
          'label': 'Menos de 1 mês',
        },
        {
          'value': '1_month',
          'label': '1 mês',
        },
        {
          'value': '2_months',
          'label': '2 meses',
        },
        {
          'value': '3_months',
          'label': '3 meses',
        },
        {
          'value': '4_to_6_months',
          'label': '4 a 6 meses',
        },
        {
          'value': '7_months_to_1_year',
          'label': '7 a 12 meses',
        },
        {
          'value': '1_year_to_2_years',
          'label': '1 ano a 2 anos',
        },
        {
          'value': 'more_than_2_years',
          'label': 'Mais de 2 anos',
        },
      ],
    },
  },
  {
    'slug': 'residence_type',
    'component': 'select',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'label': 'Tipo de residencia',
      'options': [
        {
          'value': 'own',
          'label': 'Própria',
        },
        {
          'value': 'rent',
          'label': 'Alugada',
        },
        {
          'value': 'family',
          'label': 'Familiares',
        },
      ],
    },
  },
  {
    'slug': 'home_phone',
    'component': 'phone',
    'validators': [
      {
        'type': 'phone',
      },
    ],
    'meta': {
      'label': 'Telefone Residencial (Opcional)',
    },
  },
];

const payload = {
  zipcode: '172636423',
  street_address: '',
  street_number: 'asjhdf',
  neighborhood: '2324',
  city: '2324',
  state: 's',
  time_at_address: '23',
  residence_type: 'own',
};

export default { fields, payload };
