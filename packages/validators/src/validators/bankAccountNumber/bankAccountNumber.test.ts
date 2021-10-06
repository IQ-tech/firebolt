import isBankAccountNumberValid from './index';

describe.each([
  {
    account: '15964197',
    properties: {
      bankBranch: '69736',
      accountType: null,
      bankSlug: 'bradesco',
    },
  },
  {
    account: '15964197',
    properties: {
      bankBranch: '69736',
      accountType: null,
      bankSlug: 'bradesco',
    },
  },
  {
    account: '1182265-7',
    properties: {
      bankBranch: '2921',
      accountType: null,
      bankSlug: 'bradesco',
    },
  },
  {
    account: '0381968P',
    properties: {
      bankBranch: '1562-8',
      accountType: null,
      bankSlug: 'bradesco',
    },
  },
  {
    account: '0967534-5',
    properties: {
      bankBranch: '58920',
      accountType: null,
      bankSlug: 'bradesco',
    },
  },
  {
    account: '00416-6',
    properties: {
      bankBranch: '5126',
      accountType: null,
      bankSlug: 'itau',
    },
  },
  {
    account: '31373-2',
    properties: {
      bankBranch: '1588',
      accountType: null,
      bankSlug: 'itau',
    },
  },
  {
    account: '78811-7',
    properties: {
      bankBranch: '7716',
      accountType: null,
      bankSlug: 'itau',
    },
  },
  {
    account: '31373-2',
    properties: {
      bankBranch: '1588',
      accountType: null,
      bankSlug: 'Itaú',
    },
  },
  {
    account: '759102',
    properties: {
      bankBranch: '8514',
      accountType: null,
      bankSlug: 'itau',
    },
  },
  {
    account: '37171261-4',
    properties: {
      bankBranch: '0358',
      accountType: null,
      bankSlug: 'santander',
    },
  },
  {
    account: '45132868-3',
    properties: {
      bankBranch: '4433',
      accountType: null,
      bankSlug: 'santander',
    },
  },
  {
    account: '13881092-8',
    properties: {
      bankBranch: '0275',
      accountType: null,
      bankSlug: 'santander',
    },
  },
  {
    account: '13653948-5',
    properties: {
      bankBranch: '1243',
      accountType: null,
      bankSlug: 'santander',
    },
  },
  {
    account: '00000448-6',
    properties: {
      bankBranch: '2004',
      accountType: '001',
      bankSlug: 'caixa',
    },
  },
  {
    account: '23547492-0',
    properties: {
      bankBranch: '4899',
      accountType: '011',
      bankSlug: 'caixa',
    },
  },
  {
    account: '22843851-2',
    properties: {
      bankBranch: '2106',
      accountType: '013',
      bankSlug: 'caixa',
    },
  },
  {
    account: '210169-6',
    properties: {
      bankBranch: '1584-9',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '45939-9',
    properties: {
      bankBranch: '0395-6',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '14728-1',
    properties: {
      bankBranch: '2995-5',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '210169-6',
    properties: {
      bankBranch: '1584-9',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '12351-0',
    properties: {
      bankBranch: '0229-1',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '38582-4',
    properties: {
      bankBranch: '3456-8',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '5159-4',
    properties: {
      bankBranch: '4556-0',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '45568499',
    properties: {
      bankBranch: '35122',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '78190',
    properties: {
      bankBranch: '44512',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '327697',
    properties: {
      bankBranch: '00230',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '86541',
    properties: {
      bankBranch: '38717',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '476218',
    properties: {
      bankBranch: '35890',
      accountType: null,
      bankSlug: 'bb',
    },
  },
])('Bank account validation', ({ account, properties }) => {
  test(`Account ${account} should pass on bank account validation (props: ${JSON.stringify(
    properties,
  )})`, () => {
    expect(
      isBankAccountNumberValid.run(account, properties).isValid,
    ).toBeTruthy();
  });
});

describe.each([
  {
    account: '0436A000',
    properties: {
      bankBranch: '1471-0',
      accountType: null,
      bankSlug: 'bradesco',
    },
  },
  {
    account: '8999!999',
    properties: {
      bankBranch: '1562-2',
      accountType: null,
      bankSlug: 'bradesco',
    },
  },
  {
    account: '1234567',
    properties: {
      bankBranch: '1234-3',
      accountType: null,
      bankSlug: 'bradesco',
    },
  },
  {
    account: '0436A',
    properties: { bankBranch: '5126', accountType: null, bankSlug: 'itau' },
  },
  {
    account: '8999!',
    properties: { bankBranch: '3136', accountType: null, bankSlug: 'itau' },
  },
  {
    account: '12345',
    properties: { bankBranch: '5268', accountType: null, bankSlug: 'itau' },
  },
  {
    account: '8999!',
    properties: {
      bankBranch: '3136',
      accountType: null,
      bankSlug: 'santander',
    },
  },
  {
    account: '027925622',
    properties: {
      bankBranch: '0183',
      accountType: null,
      bankSlug: 'santander',
    },
  },
  {
    account: '48267094-0',
    properties: {
      bankBranch: '7227',
      accountType: null,
      bankSlug: 'santander',
    },
  },
  {
    account: '8999!',
    properties: {
      bankBranch: '3136',
      accountType: '001',
      bankSlug: 'caixa',
    },
  },
  {
    account: '027925622',
    properties: {
      bankBranch: '0183',
      accountType: '01A',
      bankSlug: 'caixa',
    },
  },
  {
    account: '48267094-0',
    properties: {
      bankBranch: '7227',
      accountType: '013',
      bankSlug: 'caixa',
    },
  },
  {
    account: '459393',
    properties: {
      bankBranch: '03956',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '147289',
    properties: {
      bankBranch: '29955',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '68019083',
    properties: {
      bankBranch: '70718',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '123514',
    properties: {
      bankBranch: '02291',
      accountType: null,
      bankSlug: 'bb',
    },
  },
  {
    account: '81165291',
    properties: {
      bankBranch: '07420',
      accountType: null,
      bankSlug: 'bb',
    },
  },
])('invalid Bank account validation', ({ account, properties }) => {
  test(`Account ${account} should not pass on bank account validation (props: ${JSON.stringify(
    properties,
  )})`, () => {
    expect(
      isBankAccountNumberValid.run(account, properties).isValid,
    ).toBeFalsy();
  });
});
