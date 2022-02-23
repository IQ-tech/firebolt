module.exports = function phoneMask(value) {
  const safeValue = value || ""
  const onlyNums = safeValue.replace(/\D/g, "")
  const filledResidencial = onlyNums.length >= 11

  const residencialMask = [
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

  const phoneMask = [
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
  return filledResidencial ? phoneMask : residencialMask
}
