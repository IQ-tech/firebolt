import {
  leftPad,
  getBranchAndDigit,
  getAccountAndDigit,
  cleanAccountAndBranchStrings,
  getMultipliersAndAccountProduct,
} from './utils';

export default function validatorBancoDoBrasil(
  bankBranch: string,
  bankAccount: string,
) {
  const { formattedAccount, formattedBranch } = cleanAccountAndBranchStrings(
    bankAccount,
    bankBranch,
  );
  const { account, accountDigit } = getAccountAndDigit(formattedAccount);
  const { branch, branchDigit } = getBranchAndDigit(formattedBranch, 1);
  const isBranchValid = validateBranch(branch, branchDigit);
  const isAccountValid = validateAccount(account, accountDigit);
  return isBranchValid && isAccountValid;
}

function getSpectedDv(value: string, multipliers: Array<string>) {
  const multipliersResult = getMultipliersAndAccountProduct(multipliers, value);
  const divRest = multipliersResult % 11;
  const result = 11 - divRest;

  let dv;
  switch (result) {
    case 10:
      dv = 0;
      break;
    case 11:
      dv = 0;
      break;
    default:
      dv = result;
  }

  return dv.toString();
}

function validateBranch(branch: string, branchDigit: string | number) {
  const multipliers = ['5', '4', '3', '2'];
  const dv = getSpectedDv(branch, multipliers);
  return dv === branchDigit;
}

function validateAccount(account: string, accountDigit: string | number) {
  const multipliers = ['9', '8', '7', '6', '5', '4', '3', '2'];
  const paddedAccount = leftPad(account, '0', multipliers.length);
  const dv = getSpectedDv(paddedAccount, multipliers);
  return dv === accountDigit;
}
