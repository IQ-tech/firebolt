import {
  leftPad,
  getAccountAndDigit,
  getMultipliersAndAccountProduct,
  cleanAccountAndBranchStrings,
} from './utils';

export default function validatorCaixa(
  bankBranch: string,
  bankAccount: string,
  accountType: string,
): boolean {
  const { formattedAccount, formattedBranch } = cleanAccountAndBranchStrings(
    bankAccount,
    bankBranch,
  );

  const { account, accountDigit: accountDigitStr } =
    getAccountAndDigit(formattedAccount);
  const accountDigit = Number(accountDigitStr);

  const multipliers = [
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
  ];

  const paddedBrach = leftPad(formattedBranch, '0', 4);
  const paddedAccount = leftPad(account, '0', 8);
  const paddedAccountType = leftPad(accountType, '0', 3);

  const accountCode = paddedBrach + paddedAccountType + paddedAccount;

  const result = getMultipliersAndAccountProduct(multipliers, accountCode);

  const divRest = (result * 10) % 11;

  if (divRest === 10) {
    return accountDigit === 0;
  }

  return divRest === accountDigit;
}
