export const email = {
  "invalidEmail": "Email inválido",
  "specialCharacters": "Caracteres especiais não são permitidos",
  "invalidDomain":
    "O dominio do email não deve começar ou terminar com hífen (-)",
}

export const wordsCount = {
  "maxWords": "O valor deve ter no máximo #{maxWords} palavras",
  "minWords": "O valor, deve ter pelo menos #{minWords} palavras",
  "conflictBetweenMinAndMax":
    "Conflito na validação, a propriedade minWords (#{minWords} palavras) deve ser inferior a maxWords (#{maxWords} palavras)",
}

export const stringLength = {
  "lessThanMin":
    "O valor '#{value}' é menor que o tamanho minito permitido: #{minLength} caracteres",
  "greaterThanMax":
    "O valor '#{value}' é maior que o tamanho máximo permitido: #{maxLength} caracteres",
  "shouldEquals": "O valor '#{value}' deve ter #{equals} caracteres",
}

export const repeatedChars = {
  "certainRepeatedLetter":
    "A letra '#{char}' não pode se repetir mais que #{times} vezes",
  "repeatedLetters":
    "O valor não deve possuir mais que #{times} letras repetidas em sequencia",
}

export const wordsLength = {
  "noWords": "O valor '#{value}' não possui palavras",
  "wordsExceedsMax":
    "O valor '#{value}' inclui mais do que #{maxWordLength} palavras",
  "wordsSmallerMin":
    "O valor '#{value}' inclui menos do que #{minWordLength} palavras",
  "equals": "O valor '#{value}' deve ter #{equalsWordLength} palavras",
}
