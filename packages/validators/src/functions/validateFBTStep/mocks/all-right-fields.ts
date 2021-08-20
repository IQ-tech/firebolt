import { FieldConfig } from '../../../types';

const fields: FieldConfig[] = [
  {
    'slug': 'gender',
    'component': 'select',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'label': 'Qual é o seu sexo?',
      'options': [
        {
          'value': 'male',
          'label': 'Masculino',
        },
        {
          'value': 'female',
          'label': 'Feminino',
        },
      ],
    },
  },
  {
    'slug': 'date_of_birth',
    'component': 'date',
    'validators': [
      {
        'type': 'required',
      },
      {
        'type': 'date',
      },
    ],
    'meta': {
      'label': 'Data de Nascimento',
    },
  },
  {
    'slug': 'marital_status',
    'component': 'select',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'label': 'Estado civil',
      'options': [
        {
          'value': 'single',
          'label': 'Solteiro(a)',
        },
        {
          'value': 'married',
          'label': 'Casado(a)',
        },
        {
          'value': 'divorced',
          'label': 'Divorciado(a)/Separado(a)',
        },
        {
          'value': 'widowed',
          'label': 'Viúvo(a)',
        },
      ],
    },
  },
  {
    'slug': 'mothers_name',
    'component': 'text',
    'validators': [
      {
        'type': 'required',
      },
      {
        'type': 'name',
      },
    ],
    'meta': {
      'label': 'Nome completo da mãe',
      'placeholder': '',
    },
  },
  {
    'slug': 'educational_level',
    'component': 'select',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'label': 'Escolaridade',
      'options': [
        {
          'value': 'no education',
          'label': 'Nível Básico',
        },
        {
          'value': 'some high School',
          'label': 'Primeiro Grau Completo',
        },
        {
          'value': 'high School diploma',
          'label': 'Segundo Grau Completo',
        },
        {
          'value': 'college',
          'label': 'Superior Completo',
        },
      ],
    },
  },
  {
    'slug': 'nationality',
    'component': 'select',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'label': 'Nacionalidade',
      'options': [
        {
          'value': 'BR',
          'label': 'Brasil',
        },
      ],
    },
  },
  {
    'slug': 'birth_region',
    'component': 'select',
    'validators': [
      {
        'type': 'required',
      },
    ],
    'meta': {
      'label': 'Naturalidade',
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
    'slug': 'main_phone',
    'component': 'phone',
    'validators': [
      {
        'type': 'required',
      },
      {
        'type': 'phone',
      },
    ],
    'meta': {
      'label': 'Telefone celular',
    },
  },
];

const payload: Record<string, string> = {
  'gender': 'male',
  'date_of_birth': '20/01/2000',
  'marital_status': 'single',
  'nationality': 'BR',
  'mothers_name': 'cebola batata',
  'educational_level': 'no education',
  'birth_region': 'BR-AC',
  'main_phone': '(11) 91234-1234',
};

export default { fields, payload };
