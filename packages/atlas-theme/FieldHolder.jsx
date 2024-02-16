import React from "react";

import "./styles.scss";

const FieldHolder = ({ useLabel = false, fieldName, label, children }) => {
  return (
    <div className="form-item">
      {useLabel ? <label className="field__label" htmlFor={fieldName}>{ label }</label> : <h4>{label}</h4>}

      {children}
    </div>

  //<div
  //   class="min-max-info-container"
  //   *ngIf="this.showAmountMinMaxMessage">
  //   <p>
  //     Valor mínimo de {{ this.minLoanAmount | currency }} e máximo de
  //     {{ this.maxLoanAmount | currency }}
  //   </p>
  // </div> usar o JSON pra add dps do field)
  )
}

export default FieldHolder
