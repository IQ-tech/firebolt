import React from "react";

import "./styles.scss";

const FieldHolder = ({ useLabel = false, fieldName, label, children }) => {
  return (
    <div className="form-item">
      {useLabel ? <label className="field__label" htmlFor={fieldName}>{ label }</label> : <h4>{label}</h4>}

      {children}
    </div>
  )
}

export default FieldHolder
