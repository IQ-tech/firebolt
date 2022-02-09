const RequestThemePlaceholder = ({ fieldName }) => {
  return <p>Add a firebolt theme with {fieldName} widget support</p>
}

export default function getFieldComponent({ customTheme = {}, widgetName }) {
  const customComponent = customTheme[widgetName]
  const fallbackComponent = customTheme["Text"]

  if (!!customComponent) return customComponent
  else if (!!fallbackComponent) return fallbackComponent
  else return () => <RequestThemePlaceholder fieldName={widgetName} />
}
