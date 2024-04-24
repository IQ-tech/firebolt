import TextWidget from "./Widgets/TextWidget"
import NumberWidget from "./Widgets/NumberWidget"
import SelectWidget from "./Widgets/SelectWidget"
import RadioGroupWidget from "./Widgets/RadioGroupWidget"
import RadioButtonGroupWidget from "./Widgets/RadioButtonGroupWidget"
import CurrencyWidget from "./Widgets/CurrencyWidget"
import CEPWidget from "./Widgets/CEPWidget"
import BRCityWidget from "./Widgets/BRCityWidget"

const defaultTheme = {
  "Text": TextWidget,
  "Select": SelectWidget,
  "Number": NumberWidget,
  "Radio": RadioGroupWidget,
  "Radio-Unified": RadioButtonGroupWidget,
  "Currency": CurrencyWidget,
  "CEP": CEPWidget,
  "BRCity": BRCityWidget,
}

export default defaultTheme
