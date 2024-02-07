import React from "react";

import "./styles.scss";

const FieldHolder = ({ inputName, label, children }) => {
  return (
    <div className="input-container">
      <label htmlFor={inputName}>{label}</label>

      <div className="float-label">
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
