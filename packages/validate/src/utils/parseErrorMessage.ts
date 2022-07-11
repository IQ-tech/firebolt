interface IGenericObject {
  [propertyKey: string]: string | undefined
}

export default function parseErrorMessage(
  errorMessage: string,
  value: any,
  properties?: IGenericObject
): string {
  return errorMessage.replaceAll(/#{(.+?)}/g, (_, internal) => {
    const safeInternal: string = internal || ""
    const withoutSpaces = safeInternal.replace(" ", "")
    const isValue = withoutSpaces === "value"
    if (isValue) {
      return value
    }

    return String(properties?.[withoutSpaces])
  })
}
