import React from "react"

export function filterChildren(
  children: React.ReactElement | React.ReactElement[],
  currentStepSlug: string
): React.ReactElement | null {
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

  const result = exactMatch ? exactMatch : getFirstGeneralCaseItem()
  return result as React.ReactElement | null
}
