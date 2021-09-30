import STATE_OPTIONS from "../constants/state-options"

// masks
import CPFMask from "../masks/br/CPF"
import CEPMask from "../masks/br/CEP"
import BRCurrency from "../masks/br/currency"
import {
  BRPhoneMask,
  BRPhoneResidentialMask,
  BRPhoneHybridMask,
} from "../masks/br/phone"
import MonthYearMask from "../masks/date/month-year"
import DayMonthYearMask from "../masks/date/day-month-year"

const UIPropsPresets = {
  "br-states": {
    label: "Estado",
    options: STATE_OPTIONS,
  },
  "br-cpf": {
    placeholder: "000.000.000-00",
    label: "CPF",
    mask: CPFMask,
  },
  "br-cep": {
    label: "CEP",
    placeholder: "00000-000",
    mask: CEPMask,
  },
  "br-currency": {
    placeholder: "R$ 00.000,00",
    mask: BRCurrency,
  },
  "br-phone": {
    htmlType: "tel",
    label: "Celular com DDD",
    placeholder: "(00) 00000-0000",
    mask: BRPhoneMask,
  },
  "br-phone-residential": {
    htmlType: "tel",
    label: "Telefone com DDD",
    placeholder: "(00) 0000-0000",
    mask: BRPhoneResidentialMask,
  },
  "br-phone-hybrid": {
    htmlType: "tel",
    label: "Telefone com DDD",
    placeholder: "(00) 0000-0000",
    mask: BRPhoneHybridMask,
  },
  "day-month-year": {
    placeholder: "DD/MM/AAAA",
    label: "",
    mask: DayMonthYearMask,
  },
  "month-year": {
    placeholder: "MM/AAAA",
    label: "",
    mask: MonthYearMask,
  },
  "month-day-options": {
    options: [...Array(31).keys()].map((_, i) => ({
      value: Number(i) + 1,
      label: Number(i) + 1,
    })),
  },
}

export default UIPropsPresets
