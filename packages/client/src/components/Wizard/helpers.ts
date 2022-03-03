import React from "react"

export function filterChildren(
  children: React.ReactElement[],
  currentStepSlug: string
) {
  if (!children) return null

  const childrenArray = React.Children.toArray(children)

  const exactMatch = childrenArray.find((child: React.ReactElement) => {
    return child?.props?.match?.slug === currentStepSlug
  })

  const getFirstGeneralCaseItem = () =>
    childrenArray.find((child: React.ReactElement) => {
      const childMatch = child?.props?.match
      return !childMatch || childMatch === "*"
    })

  return exactMatch ? exactMatch : getFirstGeneralCaseItem()
}
