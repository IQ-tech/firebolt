import { FieldConfig } from "../../../types";

const fields: FieldConfig[] = [
  {
    'slug': 'cpf',
    'component': 'cpf',
    'validators': [{ 'type': 'required' }, { 'type': 'cpf' }],
    'meta': {},
  },
  {
    'slug': 'full_name',
    'component': {
      'name': 'text',
      'properties': {
        'label': 'Nome completo',
        'placeholder': 'Digite seu nome completo',
      },
    },
    'validators': [{ 'type': 'name' }],
    'meta': {},
  },
  {
    'slug': 'main_phone',
    'component': {
      'name': 'phone',
      'properties': {
        'label': 'Telefone celular',
      },
    },
    'validators': [{ 'type': 'phone' }],
    'meta': {},
  },
  {
    'slug': 'my_conditional_field',
    'conditional': "step.full_name === 'cebola batata'",
    'component': {
      'name': 'text',
      'properties': {
        'label': 'cenoura',
      },
    },
    'validators': [{ 'type': 'required' }],
  },
  {
    'slug': 'email',
    'component': 'email',
    'validators': [{ 'type': 'email' }],
    'meta': {},
  },
];

const invalidConditionalField = {
  cpf: '447.706.900-61',
  full_name: 'cebola batata',
  main_phone: '11912341234',
  email: 'test@gmail.com',
};

const validConditionalField = {
  cpf: '447.706.900-61',
  full_name: 'cebola batata',
  my_conditional_field: 'haha',
  main_phone: '11912341234',
  email: 'test@gmail.com',
};

const ignoredConditionalField = {
  cpf: '447.706.900-61',
  full_name: 'batata cenoura',
  main_phone: '11912341234',
  email: 'test@gmail.com',
};

export default {
  fields,
  ignoredConditionalField,
  validConditionalField,
  invalidConditionalField,
};
