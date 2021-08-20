import { Validator, ValidationResult } from '../../classes';

export interface StringValidationProps {
  minWords?: number;
  maxWords?: number;
  minCharsPerWord?: number;
  maxCharsPerWord?: number;
  specialChars?: boolean;
}

function customStringValidation(
  value = '',
  {
    minWords,
    maxWords,
    minCharsPerWord,
    maxCharsPerWord,
  }: StringValidationProps,
): ValidationResult {
  if (!value) return new ValidationResult(true);

  const words = value.split(' ');
  const wordsCount = words.length;

  if (!!minWords && wordsCount < minWords) {
    return new ValidationResult(
      false,
      `O campo precisa ter pelo menos ${minWords} palavras`,
    );
  }

  if (!!maxWords && wordsCount > maxWords) {
    return new ValidationResult(
      false,
      `O campo precisa ter no máximo ${maxWords} palavras`,
    );
  }

  if (!!minCharsPerWord || maxCharsPerWord) {
    for (let word of words) {
      const wordLength = word.length;

      if (!!minCharsPerWord && wordLength < minCharsPerWord) {
        return new ValidationResult(
          false,
          `As palavras precisam ter pelo menos ${minCharsPerWord} caracteres.`,
        );
      }

      if (!!maxCharsPerWord && wordLength > maxCharsPerWord) {
        return new ValidationResult(
          false,
          `As palavras precisam ter no máximo ${minCharsPerWord} caracteres.`,
        );
      }
    }
  }

  return new ValidationResult(true);
}

export default new Validator<StringValidationProps>(customStringValidation);
