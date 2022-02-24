const RequestThemePlaceholder = ({ fieldName }) => {
  return (
    <div style={{ "backgroundColor": "gray", padding: "20px" }}>
      <p style={{ color: "white", fontSize: "20px" }}>
        Please, add a firebolt theme with <strong>{fieldName}</strong> widget
        support
      </p>
    </div>
  )
}

export default function getFieldComponent({ customTheme = {}, widgetName }) {
  const customComponent = customTheme[widgetName]

  if (!!customComponent) return customComponent
  else return () => <RequestThemePlaceholder fieldName={widgetName} />
}
