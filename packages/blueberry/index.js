import TextWidget from "./Widgets/TextWidget"
import SelectWidget from "./Widgets/SelectWidget"
import PasswordWidget from "./Widgets/PasswordWidget"
import CEPWidget from "./Widgets/CEPWidget"
import NumberWidget from "./Widgets/NumberWidget"
import EmailWidget from "./Widgets/EmailWidget"
import CheckboxGroupWidget from "./Widgets/CheckboxGroupWidget"
import RadioWidget from "./Widgets/RadioWidget"
import CheckWidget from "./Widgets/CheckWidget"
import BRCityWidget from "./Widgets/BRCityWidget"
import TextareaWidget from './Widgets/TextareaWidget'

// todo - document
const blueberryTheme = {
  // Bluberry theme exclusive widgets
  "CEP": CEPWidget,
  "BRCity": BRCityWidget,
  // Regular firebolt widgets
  "Email": EmailWidget,
  "Text": TextWidget,
  "Select": SelectWidget,
  "Number": NumberWidget,
  "Password": PasswordWidget,
  "Check": CheckWidget,
  "CheckboxGroup": CheckboxGroupWidget,
  "Radio": RadioWidget,
  "Textarea": TextareaWidget
}

export default blueberryTheme
export {
  TextWidget,
  SelectWidget,
  PasswordWidget,
  CEPWidget,
  NumberWidget,
  EmailWidget,
  CheckWidget,
  CheckboxGroupWidget,
  RadioWidget,
  TextareaWidget,
}
