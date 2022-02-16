const getTooltipConfig = (fbFieldMetadata) => {
  const safeFieldMetadata = fbFieldMetadata || {}
  const tooltipText = safeFieldMetadata["tooltip_text"]
  const tooltipTitle = safeFieldMetadata["tooltip_title"]
  const tooltipContainer = safeFieldMetadata["tooltip_container"]
  return !!tooltipText
    ? {
        placement: "top",
        desc: tooltipText,
        title: tooltipTitle,
        tooltipContainer: tooltipContainer,
      }
    : false
}

export default getTooltipConfig
