import React from "react"
import TextWidget from "../TextWidget"

const NumberWidget = ({ min = "0", max, maxLength, ...rest }) => {
  const handleChange = (value) => {
    if (maxLength && value.length > maxLength) {
      value = value.slice(0, maxLength)
    }
    rest.onChange(value);
  }

  const handleBlur = (value) => {
    if (value === "" || value === "-") {
      rest.onChange(value);
      return;
    }

    const numericValue = Number(value);
    const minValue = Number(min);
    const maxValue = max !== undefined ? Number(max) : Infinity;
    const clampedValue = Math.max(minValue, Math.min(numericValue, maxValue));

    rest.onChange(clampedValue.toString());
  };

  return (
    <TextWidget
      {...rest}
      htmlType="number"
      min={min}
      max={max}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

export default NumberWidget;
