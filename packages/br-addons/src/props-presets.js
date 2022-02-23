const STATE_OPTIONS = require ("./constants/state-options")

// masks
const CPFMask = require("./masks/br/CPF")
const CEPMask = require("./masks/br/CEP")
const BRCurrency = require("./masks/br/currency")
const {
  BRPhoneMask,
  BRPhoneResidentialMask,
  BRPhoneHybridMask,
} = require("./masks/br/phone")
const MonthYearMask = require("./masks/date/month-year")
const DayMonthYearMask = require("./masks/date/day-month-year")

const UIPropsPresetsList = {
  "br-states": {
    label: "Estado",
    options: STATE_OPTIONS,
  },
  "br-cpf": {
    placeholder: "000.000.000-00",
    label: "CPF",
    mask: CPFMask,
    useNumericKeyboard: true
  },
  "br-cep": {
    label: "CEP",
    placeholder: "00000-000",
    mask: CEPMask,
    useNumericKeyboard: true
  },
  "br-currency": {
    placeholder: "R$ 00.000,00",
    mask: BRCurrency,
    useNumericKeyboard: true
  },
  "br-phone": {
    htmlType: "tel",
    label: "Celular com DDD",
    placeholder: "(00) 00000-0000",
    mask: BRPhoneMask,
    useNumericKeyboard: true
  },
  "br-phone-residential": {
    htmlType: "tel",
    label: "Telefone com DDD",
    placeholder: "(00) 0000-0000",
    mask: BRPhoneResidentialMask,
    useNumericKeyboard: true
  },
  "br-phone-hybrid": {
    htmlType: "tel",
    label: "Telefone com DDD",
    placeholder: "(00) 0000-0000",
    mask: BRPhoneHybridMask,
    useNumericKeyboard: true
  },
  "day-month-year": {
    placeholder: "DD/MM/AAAA",
    label: "",
    mask: DayMonthYearMask,
    useNumericKeyboard: true
  },
  "month-year": {
    placeholder: "MM/AAAA",
    label: "",
    mask: MonthYearMask,
    useNumericKeyboard: true
  },
  "month-day-options": {
    options: [...Array(31).keys()].map((_, i) => ({
      value: Number(i) + 1,
      label: Number(i) + 1,
    })),
  },
}



module.exports = {
  name: "br-addons",
  presets: UIPropsPresetsList
}
