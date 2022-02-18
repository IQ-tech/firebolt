const formattersList = {
  "autofill": (data = {}, params = {}) => {
    return { ...data, autofill: true }
  },
  "ui:props-presets": (data = {}, params = {}) => {
    return { ...data, presets: true }
  },
}

interface FormatterConfig {
  formatter: string // TODO - check better typing
  params: Object
}



export function applyFormatting(
  formData: Object = {},
  formatters: FormatterConfig[] = []
) {
  const newValue = formatters.reduce((acc, formatterConfig) => {
    const formatterName = formatterConfig?.formatter
    const formatterParams = formatterConfig?.params
    const formatterFunction = formattersList?.[formatterName]
    const formattedObj = formatterFunction(acc, formatterParams)
    return formattedObj
  }, formData)

  console.log(newValue)
}


