import { Validator, ValidationResult } from '../../classes';

export interface FileProprieties {
  url: string;
  extension: string;
  size: number;
}

export interface FileValidationProps {
  allowedExtensions?: string[];
  sizeLimit?: number;
}

function isFileValid(
  file: FileProprieties,
  { allowedExtensions, sizeLimit }: FileValidationProps,
): ValidationResult {
  const isValidUrl = file.url !== '';
  const invalidUrlMessage = isValidUrl ? '' : `URL ${file?.url} não é válido`;

  const isValidExtension =
    allowedExtensions === undefined ||
    allowedExtensions?.find((extension) => extension === file.extension) !==
      undefined;
  const invalidExtensionMessage = isValidExtension
    ? ''
    : `Extensão ${file?.extension} não é válida`;

  const isValidSize = sizeLimit === undefined || file?.size <= sizeLimit;
  const invalidSizeMessage = isValidSize
    ? ''
    : `Tamanho ${file?.size} excede o limite permitido'`;

  const isValid = isValidUrl && isValidExtension && isValidSize;
  const message = [
    invalidUrlMessage,
    invalidExtensionMessage,
    invalidSizeMessage,
  ]
    .filter((message) => message.length > 0)
    .join(', ');

  return new ValidationResult(isValid, message);
}

export default new Validator(isFileValid);
