import React from "react"

/**
 * This function compose the form step children,
 * it takes the fields array created by `getFormFields` and composes it
 * with the FireboltForm.insert present on FireboltForm children .
 */
export default function remapFormChildren({
  fieldsChildren = [],
  insertsChildren = [],
}) {
  const insertsChildrenArray = React.Children.toArray(insertsChildren)

  const slugInsertsMap = insertsChildrenArray.reduce((acc, insertComponent) => {
    const componentProps = insertComponent?.props
    const insertBefore = componentProps?.before
    const insertAfter = componentProps?.after
    const usedInsert = insertBefore || insertAfter
    const insertRelativeToFirstField = usedInsert === "first"
    const insertRelativeToLastField = usedInsert === "last"
    const getUsedInsertReference = () => {
      if (insertRelativeToFirstField || insertRelativeToLastField) {
        return usedInsert
      } else return usedInsert?.fieldSlug
    }
    const usedInsertReference = getUsedInsertReference()

    const componentRefs = {
      after: !!insertAfter ? [insertComponent] : [],
      before: !!insertBefore ? [insertComponent] : [],
    }

    return {
      ...acc,
      [usedInsertReference]: {
        before: acc?.[usedInsertReference]?.before
          ? [...acc?.[usedInsertReference]?.before, ...componentRefs?.before]
          : componentRefs?.before,
        after: acc?.[usedInsertReference]?.after
          ? [...acc?.[usedInsertReference]?.after, ...componentRefs?.after]
          : componentRefs?.after,
      },
    }
  }, {})

  const remapedChildren = fieldsChildren.reduce((acc, field, index) => {
    const isFirstItem = index === 0
    const isLastItem = index === fieldsChildren?.length - 1
    const isDefinedSpot = isFirstItem || isLastItem
    const fieldSlug = field?.props?.["data-fieldslug"];

    const beforeInserts = slugInsertsMap?.[fieldSlug]?.before || []
    const afterInserts = slugInsertsMap?.[fieldSlug]?.after || []

    const withDefinedSpotInserts = () => {
      if (isDefinedSpot) {
        const definedSpotLabel = isFirstItem
          ? "first"
          : isLastItem
          ? "last"
          : null

        const spotedInsets = slugInsertsMap?.[definedSpotLabel]
        const spotedAfterInserts = spotedInsets?.after || []
        const spotedBeforeInserts = spotedInsets?.before || []
        return {
          after: [...afterInserts, ...spotedAfterInserts],
          before: [...beforeInserts, ...spotedBeforeInserts],
        }
      } else {
        return {
          after: [...beforeInserts],
          before: [...afterInserts],
        }
      }
    }

    const { before: beforeField, after: afterField } = withDefinedSpotInserts()

    return [...acc, ...beforeField, field, ...afterField]
  }, [])

  return remapedChildren
}
