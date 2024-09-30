import TextWidget from "./Widgets/TextWidget"
import NumberWidget from "./Widgets/NumberWidget"
import CurrencyWidget from "./Widgets/CurrencyWidget"
import CEPWidget from "./Widgets/CEPWidget"
import SelectWidget from "./Widgets/SelectWidget"
import CheckboxWidget from "./Widgets/CheckboxWidget"
import RadioGroupWidget from "./Widgets/RadioGroupWidget"

const defaultTheme = {
  "Text": TextWidget,
  "Number": NumberWidget,
  "Currency": CurrencyWidget,
  "CEP": CEPWidget,
  "Select": SelectWidget,
  "Check": CheckboxWidget,
  "Radio": RadioGroupWidget,
}

export default defaultTheme
