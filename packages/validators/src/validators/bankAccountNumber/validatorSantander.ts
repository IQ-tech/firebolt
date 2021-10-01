import {
  leftPad,
  getAccountAndDigit,
  getUnitDigit,
  getMultipliersAndAccountProduct,
  cleanAccountAndBranchStrings,
} from './utils';

export default function validatorSantander(
  bankBranch: string,
  bankAccount: string,
) {
  const { formattedAccount, formattedBranch } = cleanAccountAndBranchStrings(
    bankAccount,
    bankBranch,
  );

  const { account, accountDigit: accountDigitString } =
    getAccountAndDigit(formattedAccount);
  const accountDigit = Number(accountDigitString);

  const multipliers = [
    '9',
    '7',
    '3',
    '1',
    '0',
    '0',
    '9',
    '7',
    '1',
    '3',
    '1',
    '9',
    '7',
    '3',
  ];

  const paddedBranch = leftPad(formattedBranch, '0', 4);
  const paddedAccount = leftPad(account, '0', 5);

  const accountCode = paddedBranch + '00' + paddedAccount;

  const result = getMultipliersAndAccountProduct(
    multipliers,
    accountCode,
    getUnitDigit,
  );

  const resultUnitDigit = Number(getUnitDigit(result));

  if (resultUnitDigit === 0) {
    return accountDigit === 0;
  }

  const dv = 10 - resultUnitDigit;
  return dv === accountDigit;
}
