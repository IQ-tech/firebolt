import validateGroup from './index';
import { ValidateArgs } from '../validate';

describe('ValidateGroup validates groups correclty', () => {
  test('Validates all fieds correctly', () => {
    const allValidFields: ValidateArgs[] = [
      ['cpf', '584.298.880-12'],
      ['name', 'random johson'],
      ['minAge', '19/12/1999', { 'minAge': 18 }],
      ['cep', '13224-410'],
      [
        'bankAccountNumber',
        '43715047-2',
        { 'bankBranch': '0241', 'bankSlug': 'santander' },
      ],
    ];

    expect(validateGroup(allValidFields).allFieldsValid).toBeTruthy();
  });

  test('Validates all wrong fieds correctly', () => {
    const allValidFields: ValidateArgs[] = [
      ['cpf', '584.298.880-20'],
      ['name', 'random johson4'],
      ['minAge', '19/12/2004', { 'minAge': 18 }],
      ['cep', '12312425234'],
      [
        'bankAccountNumber',
        '0052996-5',
        { 'bankBranch': '18710', 'accountType': null, 'bankSlug': 'bradesco' },
      ],
    ];

    expect(validateGroup(allValidFields).allFieldsValid).toBeFalsy();
  });

  test('Finds wrong field correctly', () => {
    const allValidFields: ValidateArgs[] = [
      ['cpf', '584.298.880-12'],
      ['name', 'random johson4'],
      ['minAge', '19/12/1999', { 'minAge': 18 }],
      ['cep', '13224-430'],
      [
        'bankAccountNumber',
        '43715047-2',
        { 'bankBranch': '0241', 'accountType': null, 'bankSlug': 'bradesco' },
      ],
    ];

    expect(validateGroup(allValidFields).invalidFields[0].fieldIndex).toBe(1);
  });
});
