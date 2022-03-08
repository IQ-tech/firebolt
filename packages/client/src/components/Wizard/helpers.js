import React from "react";

export function filterChildren(children, currentStepSlug) {
  if (!children) return null;

  const childrenArray = React.Children.toArray(children);
  const exactMatch = childrenArray.find((child) => {
    return child?.props?.match?.slug === currentStepSlug;
  });
  const getFirstGeneralCaseItem = () =>
    childrenArray.find((child) => {
      const childMatch = child?.props?.match;
      return !childMatch || childMatch === "*";
    });

  return exactMatch ? exactMatch : getFirstGeneralCaseItem();
}