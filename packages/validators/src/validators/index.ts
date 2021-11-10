import { Validator } from '../classes';
import isRequired from './required';
import isRequiredBoolean from './requiredBoolean';
import isCepValid from './cep';
import textCharsLength from './textCharsLength';
import isCnpj from './cnpj';
import isCpf from './cpf';
import isDate from './date';
import isDayValid from './day';
import isMinAge from './minAge';
import isDDDValid from './ddd';
import isValidEmail from './email';
import isGenericDocument from './genericDocument';
import isOfLegalAge from './legalAge';
import isValidName from './name';
import isNonNumeric from './nonNumeric';
import isNumeric from './numeric';
import isPhoneValid from './phone';
import noSpecialCaracteres from './noSpecialCharacters';
import customStringValidation from './customString';
import bankAccountNumber from './bankAccountNumber';
import isSameValue from './sameValue';
import isFileValid from './file';
import nonRepeatedChars from './nonRepeatedChars';
import nonSequential from './nonSequential';
import numberRange from './numberRange';

const validators: Record<string, Validator> = {
  'required': isRequired,
  'requiredboolean': isRequiredBoolean,
  'cep': isCepValid,
  'cnpj': isCnpj,
  'cpf': isCpf,
  'day': isDayValid,
  'ddd': isDDDValid,
  'email': isValidEmail,
  'genericDocument': isGenericDocument,
  'legalAge': isOfLegalAge,
  'name': isValidName,
  'nonNumeric': isNonNumeric,
  'numeric': isNumeric,
  'phone': isPhoneValid,
  'noSpecialCaracteres': noSpecialCaracteres,
  'nonSequentialCharacters': nonSequential,

  // complex validators
  'minAge': isMinAge,
  'textCharsLength': textCharsLength,
  'customStringValidation': customStringValidation,
  'bankAccountNumber': bankAccountNumber,
  'file': isFileValid,
  'date': isDate,
  'sameValue': isSameValue,
  'nonRepeatedChars': nonRepeatedChars,
  'numberRange': numberRange,
};

export default validators;
