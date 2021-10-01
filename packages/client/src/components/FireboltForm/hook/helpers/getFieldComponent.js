import defaultTheme from "../../../theme"

export default function getFieldComponent({ customTheme = {}, widgetName }) {
  const customComponent = customTheme[widgetName]
  const defaultComponent = defaultTheme[widgetName]
  const fallbackComponent = defaultTheme["Text"]

  if (!!customComponent) return customComponent
  else if (!!defaultComponent) return defaultComponent
  else return fallbackComponent
}
