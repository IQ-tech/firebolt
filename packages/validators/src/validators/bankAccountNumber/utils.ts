export function leftPad(value = '', padValue: number | string, len: number) {
  if (value.length >= len) {
    return value;
  }

  const padLength = len - value.length;
  const padStr = String(padValue).repeat(padLength) + value;

  return padStr;
}

export function getBranchAndDigit(bankBranch: string, dvLen: string | number) {
  const numberDvLen = Number(dvLen);
  const branch = bankBranch.slice(0, bankBranch.length - numberDvLen);
  const branchDigit = bankBranch.slice(bankBranch.length - numberDvLen);
  return { branch, branchDigit };
}

export function getAccountAndDigit(bankAccount: string) {
  const account = bankAccount.slice(0, bankAccount.length - 1);
  const accountDigit = bankAccount.slice(bankAccount.length - 1);
  return { account, accountDigit };
}

export function getSumOfDigits(num: number | string) {
  const numString = num.toString();
  if (numString.length === 1) {
    return num;
  }
  const numDigits = numString.split('');
  const sum = numDigits.reduce((acc, digit) => acc + parseInt(digit), 0);

  return sum;
}

export function getUnitDigit(num: number | string){
  const numString = num.toString();

  if (numString.length === 1) {
    return num;
  }

  const unitDigit = parseInt(numString.slice(-1));
  return unitDigit;
};

export const getMultipliersAndAccountProduct = (
  weights: string[],
  accountData: string,
  prodModifier?: (...args: any) => string | number
): number => {
  const result = weights.reduce((acc, currentValue, idx) => {
    const multiplier = parseInt(currentValue);
    const accDigit = parseInt(accountData[idx]);

    const product = multiplier * accDigit;
    if (prodModifier) {
      const processedProduct = Number(prodModifier(product))
      return acc + processedProduct
  }

    return acc + product;
  }, 0);

  return result;
};

export function cleanAccountAndBranchStrings(
  bankAccount: string,
  bankBranch: string,
) {
  const formattedBranch = bankBranch.replace(/[.-]+/gi, '');
  const formattedAccount = bankAccount.replace(/[.-]+/gi, '');

  return {
    formattedAccount,
    formattedBranch,
  };
}
