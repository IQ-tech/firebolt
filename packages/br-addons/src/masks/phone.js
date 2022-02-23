export const BRPhoneMask = [
  "(",
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

export const BRPhoneResidentialMask = [
  "(",
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

export const BRPhoneHybridMask = function BRPhoneHybridMask(value) {
  const safeValue = value || ""
  const onlyNums = safeValue.replace(/\D/g, "")
  const filledResidencial = onlyNums.length >= 11

  return filledResidencial ? BRPhoneMask : BRPhoneResidentialMask
}
