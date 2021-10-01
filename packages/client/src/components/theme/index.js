import EmailWidget from "./Widgets/EmailWidget"
import TextWidget from "./Widgets/TextWidget"
import NumberWidget from "./Widgets/NumberWidget"
import SelectWidget from "./Widgets/SelectWidget"
import PasswordWidget from "./Widgets/PasswordWidget"
import UploadWidget from "./Widgets/UploadWidget"
import RadioWidget from "./Widgets/RadioWidget"
import CheckboxGroupWidget from "./Widgets/CheckboxGroupWidget"
import CheckWidget from "./Widgets/CheckWidget"

const defaultTheme = {
  "Email": EmailWidget,
  "Text": TextWidget,
  "TextArea": () => <p>textArea</p>,
  "Upload": UploadWidget,
  "Select": SelectWidget,
  "Number": NumberWidget,
  "Password": PasswordWidget,
  "Check": CheckWidget,
  "CheckboxGroup": CheckboxGroupWidget,
  "Radio": RadioWidget,
}

export default defaultTheme
