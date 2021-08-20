import {
  leftPad,
  getBranchAndDigit,
  getAccountAndDigit,
  getMultipliersAndAccountProduct,
  cleanAccountAndBranchStrings,
} from './utils';

export default function validatorBradesco(
  bankBranch: string,
  bankAccount: string,
) {
  const { formattedAccount, formattedBranch } = cleanAccountAndBranchStrings(
    bankAccount,
    bankBranch,
  );
  const { account, accountDigit } = getAccountAndDigit(formattedAccount);
  const { branch, branchDigit } = getBranchAndDigit(formattedBranch, 1);
  const isAccountValid = validateAccount(account, accountDigit);
  const isBranchValid = validadeBranch(branch, branchDigit);
  return isAccountValid && isBranchValid;
}

function validateAccount(account: string, accountDigit: string | number) {
  const multipliers = ['3', '2', '7', '6', '5', '4', '3', '2'];
  const paddedAccount = leftPad(account, '0', multipliers.length);
  const result = getMultipliersAndAccountProduct(multipliers, paddedAccount);

  let dv;
  const divRest = result % 11;
  switch (divRest) {
    case 0:
      dv = '0';
      break;
    case 1:
      dv = 'P';
      break;
    default:
      dv = 11 - divRest;
  }

  return dv.toString() === accountDigit;
}

function validadeBranch(branch: string, branchDigit: string) {
  const multipliers = ['5', '4', '3', '2'];
  const paddedBranch = leftPad(branch, '0', multipliers.length);
  const result = getMultipliersAndAccountProduct(multipliers, paddedBranch);

  if (result === 10) {
    return branchDigit.toUpperCase() === 'P';
  }

  const divRest = result % 11;
  const numberDigit = Number(branchDigit);
  if (divRest == 0) {
    return numberDigit === divRest;
  }

  const dv = 11 - divRest;
  return dv === numberDigit;
}
