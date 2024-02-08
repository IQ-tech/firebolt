import React from "react";

import "./styles.scss";

const FieldHolder = ({ inputName, label, children }) => {
  return (
    <div className="form-item">
      <h4 htmlFor={inputName}>{label}</h4>

      <div className="input-container">
        {children}
      </div>
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
