import { ValidationResult, Validator } from '../../classes';

function isValidName(name = ''): ValidationResult {
  if (!name) return new ValidationResult(true);

  const safeName = name || '';
  const nameWithoutSpaces = safeName.trim();
  const blackListedNames = /^(dr|dra|sr|sra|eng)$/;
  const validCharRegex =
    /^[a-záéíóúàâêôãõüçñöÁÉÍÓÚÀÂÊÔÃÕÜÇÑÖ][a-z\\'áéíóúàâêôãõüçñöÁÉÍÓÚÀÂÊÔÃÕÜÇÑÖ\s-]+$/gi;
  const fullNameArr = nameWithoutSpaces.split(/\s+/);

  const minNameCount = 1;

  const isValidNameCount = fullNameArr.length > minNameCount;

  if (
    isValidNameCount &&
    nameWithoutSpaces.match(validCharRegex) &&
    !nameWithoutSpaces.match(blackListedNames) &&
    fullNameArr.every((personName) => {
      if (!personName.match(blackListedNames)) {
        return new ValidationResult(true);
      }
      return new ValidationResult(false);
    })
  ) {
    return new ValidationResult(true);
  }
  return new ValidationResult(false);
}

export default new Validator(isValidName);
