import { ValidationResult, Validator } from '../../classes';

import validatorBradesco from './validatorBradesco';
import validatorItau from './validatorItau';
import validatorSantander from './validatorSantander';
import validatorCaixa from './validatorCaixa';
import validatorBancoDoBrasil from './validatorBancoDoBrasil';
import cleanString from '../../utils/cleanString';

export interface BankValidationProps {
  bankBranch?: number | string;
  bankSlug?: string;
  accountType?: string | null;
}

function isBankAccountNumberValid(
  account = '',
  {
    bankBranch = '',
    bankSlug = '',
    accountType = '',
  }: BankValidationProps = {},
): ValidationResult {
  // accountType pode ser 001(corrente), 013 (poupança), 023(simplificada)
  // bank slug pode ser itau, bradesco, caixa, santander

  const bankValidatorsMap: Record<string, any> = {
    'bradesco': validatorBradesco,
    'itau': validatorItau,
    'santander': validatorSantander,
    'caixa': validatorCaixa,
    'bb': validatorBancoDoBrasil,
  };

  const safeBankSlug = typeof bankSlug === 'string' ? bankSlug : '';
  const formattedSlug = cleanString(safeBankSlug);
  const correctValidator = bankValidatorsMap[formattedSlug];
  if (!correctValidator)
    return new ValidationResult(
      false,
      `Validação para banco ${bankSlug} indisponível`,
    );
  const isValid = correctValidator(bankBranch, account, accountType);
  const message = isValid ? '' : 'Conta bancária inválida';

  return new ValidationResult(isValid, message);
}

export default new Validator<BankValidationProps>(isBankAccountNumberValid);
