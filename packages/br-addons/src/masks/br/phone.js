exports.BRPhoneMask = [
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

exports.BRPhoneResidentialMask = [
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

exports.BRPhoneHybridMask = function BRPhoneHybridMask(value) {
  const safeValue = value || ""
  const onlyNums = safeValue.replace(/\D/g, "")
  const filledResidencial = onlyNums.length >= 11

  return filledResidencial ? BRPhoneMask : BRPhoneResidentialMask
}
