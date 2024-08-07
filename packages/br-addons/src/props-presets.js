import STATE_OPTIONS from "./constants/state-options"
import NATIONALITIES from "./constants/nationalities"

// masks
import CPFMask from "./masks/CPF"
import CEPMask from "./masks/CEP"
import BRCurrency from "./masks/currency"
import {
  BRPhoneMask,
  BRPhoneResidentialMask,
  BRPhoneHybridMask,
} from "./masks/phone"
import RGMask from "./masks/RG"
import MonthYearMask from "./masks/date/month-year"
import DayMonthYearMask from "./masks/date/day-month-year"

const UIPropsPresetsList = {
  "br-states": {
    label: "Estado",
    options: STATE_OPTIONS,
  },
  "br-cpf": {
    placeholder: "000.000.000-00",
    label: "CPF",
    mask: CPFMask,
    useNumericKeyboard: true,
  },
  "br-cep": {
    label: "CEP",
    placeholder: "00000-000",
    mask: CEPMask,
    useNumericKeyboard: true,
  },
  "br-currency": {
    placeholder: "R$ 00.000,00",
    mask: BRCurrency,
    useNumericKeyboard: true,
  },
  "br-nationalities": {
    label: "Nacionalidade",
    options: NATIONALITIES,
  },
  "br-rg": {
    placeholder: "00.000.000-0",
    label: "RG",
    mask: RGMask,
  },
  "br-phone": {
    htmlType: "tel",
    label: "Celular com DDD",
    placeholder: "(00) 00000-0000",
    mask: BRPhoneMask,
    useNumericKeyboard: true,
  },
  "br-phone-residential": {
    htmlType: "tel",
    label: "Telefone com DDD",
    placeholder: "(00) 0000-0000",
    mask: BRPhoneResidentialMask,
    useNumericKeyboard: true,
  },
  "br-phone-hybrid": {
    htmlType: "tel",
    label: "Telefone com DDD",
    placeholder: "(00) 0000-0000",
    mask: BRPhoneHybridMask,
    useNumericKeyboard: true,
  },
  "day-month-year": {
    placeholder: "DD/MM/AAAA",
    label: "",
    mask: DayMonthYearMask,
    useNumericKeyboard: true,
  },
  "month-year": {
    placeholder: "MM/AAAA",
    label: "",
    mask: MonthYearMask,
    useNumericKeyboard: true,
  },
  "month-day-options": {
    options: [...Array(31).keys()].map((_, i) => ({
      value: Number(i) + 1,
      label: Number(i) + 1,
    })),
  },
  "generic-account-with-four-numbers": {
    mask: ["/\\d/", "/\\d/", "/\\d/", "/\\d/"],
  },
  "generic-account-with-eight-numbers": {
    mask: [
      "/\\d/",
      "/\\d/",
      "/\\d/",
      "/\\d/",
      "/\\d/",
      "/\\d/",
      "/\\d/",
      "/\\d/",
    ],
  },
}

export default {
  name: "br-addons",
  presets: UIPropsPresetsList,
}
