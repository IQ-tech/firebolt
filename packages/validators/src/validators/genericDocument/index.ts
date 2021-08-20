import { ValidationResult, Validator } from '../../classes';

function isGenericDocument(value = ''): ValidationResult {
  if (!value) return { isValid: true, message: '' };

  const stringfied = typeof value === 'string' ? value : String(value);
  const onlyNumbers = stringfied.replace(/\D/g, '');
  const noNumbers = stringfied.replace(/[0-9]/g, '');
  const hasMinimumChars = stringfied.length >= 6;
  const hasMoreNumbers = onlyNumbers.length > noNumbers.length;

  const isValid = hasMoreNumbers && hasMinimumChars;
  const message = isValid ? '' : 'Documento inválido';

  return new ValidationResult(isValid, message);
}

export default new Validator(isGenericDocument);
