import { ValidationResult, Validator } from '../../classes';

function isValidName(name = ''): ValidationResult {
  if (!name) return new ValidationResult(true);

  const safeName = name || '';
  const nameWithoutSpaces = safeName.trim();
  const blackListedNames = /^(dr|dra|sr|sra|eng)$/;
  const validCharRegex =
    /^[a-záéíóúàâêôãõüçñöÁÉÍÓÚÀÂÊÔÃÕÜÇÑÖ][a-z\\'áéíóúàâêôãõüçñöÁÉÍÓÚÀÂÊÔÃÕÜÇÑÖ\s-]+$/gi;
  const fullNameArr = nameWithoutSpaces.split(/\s+/);

  const noMatchDoubleSpaces = /^.*\s{2,}.*$/gi

  const minNameCount = 1;

  const isValidNameCount = fullNameArr.length > minNameCount;
  const haveAnyNameAtLeastTwoChar = !fullNameArr.filter(
    (partName) => partName.length < 2,
  ).length;

  if (
    isValidNameCount &&
    haveAnyNameAtLeastTwoChar &&
    nameWithoutSpaces.match(validCharRegex) &&
    !nameWithoutSpaces.match(noMatchDoubleSpaces) &&
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
