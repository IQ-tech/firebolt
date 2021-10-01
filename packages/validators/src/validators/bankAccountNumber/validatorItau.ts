import {
  leftPad,
  getAccountAndDigit,
  getSumOfDigits,
  getMultipliersAndAccountProduct,
  cleanAccountAndBranchStrings,
} from './utils';

export default function validatorItau(
  bankBranch: string,
  bankAccount: string,
  _accountType: string,
) {
  const { formattedAccount, formattedBranch } = cleanAccountAndBranchStrings(
    bankAccount,
    bankBranch,
  );

  const { account, accountDigit: accountDigitStr } =
    getAccountAndDigit(formattedAccount);
  const accountDigit = Number(accountDigitStr);

  const multipliers = ['2', '1', '2', '1', '2', '1', '2', '1', '2'];

  const paddedBranch = leftPad(formattedBranch, '0', 4);
  const paddedAccount = leftPad(account, '0', 5);

  const accountCode = paddedBranch + paddedAccount;

  const result = getMultipliersAndAccountProduct(
    multipliers,
    accountCode,
    getSumOfDigits,
  );

  const divRest = result % 10;
  if (divRest === 0) {
    return accountDigit == divRest;
  }

  const dv = 10 - divRest;
  return dv === accountDigit;
}
