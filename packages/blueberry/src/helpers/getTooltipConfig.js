const getTooltipConfig = (fbFieldMetadata) => {
  const safeFieldMetadata = fbFieldMetadata || {}
  const tooltipText = safeFieldMetadata["tooltip_text"]
  const tooltipTitle = safeFieldMetadata["tooltip_title"]
  return !!tooltipText
    ? { placement: "top", desc: tooltipText, title: tooltipTitle }
    : false
}

export default getTooltipConfig
