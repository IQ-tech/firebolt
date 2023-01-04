import React from "react"

import { CentralizedModal, Button } from "iq-blueberry"

import './style.styl'

const ModalOneButton = ({
  title,
  text,
  isActive,
  handleButton,
  handleCloseModal,
  buttonText,
  hasOverlay = true,
  hasCloseButton = true,
}) => {
  return (
    <CentralizedModal
      customClass="modal-one-button"
      isActive={isActive}
      hasCloseButton={hasCloseButton}
      hasOverlay={hasOverlay}
      handleCloseModal={handleCloseModal}
    >
      <div className="modal-one-button__content">
        <div className="modal-one-button__content-top">
          {title && <h2 className="modal-one-button__title">{title}</h2>}
          {text && typeof text == "string"
            ? <p className="modal-one-button__text">{text}</p>
            : text
          }
        </div>

        <div className="modal-one-button__bottom">
          <Button onClick={handleButton} size="large">{buttonText}</Button>
        </div>
      </div>
    </CentralizedModal>
  );
};

export default ModalOneButton;
