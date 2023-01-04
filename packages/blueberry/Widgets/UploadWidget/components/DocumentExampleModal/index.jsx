import React from "react"

import { Conditional } from 'iq-blueberry'

import ModalOneButton from '../ModalOneButton'
import Img from '../Img'

import { docExampleData } from './data'

import './style.styl'

const DocumentExampleModal = ({
  side,
  docType,
  handleOpenModal,
  handleCloseModal,
  isActive,
}) => {
  const sideBr = side === 'front' ? 'a frente' : 'o verso'
  const docTypePath = docType?.toLowerCase()

  return (
    <ModalOneButton
      isActive={isActive}
      handleButton={handleOpenModal}
      handleCloseModal={handleCloseModal}
      buttonText="Continuar"
      hasOverlay={true}
      hasCloseButton
      title={`Saiba como tirar a foto d${sideBr} do documento`}
      text={
        <div className="document-ex__modal">
          <Conditional
            condition={!!docType}
            renderIf={
              <Img
                className="document-ex__modal-image"
                src={`images/bb/document-examples/${side}-${docTypePath}.svg`}
                alt={`Imagem com ${sideBr} do documento ${docType}. A primeira está na vertical com uma flecha verde, demonstrando um ícone de correto. A segunda, na horizontal, com um X vermelho.`}
              />
            }
          />
          <ol className="document-ex__modal-list">
            {docExampleData?.map((text, i) => (
              <li className="document-ex__modal-list-item" key={`item-${i}`}>
                {text}
              </li>
            ))}
          </ol>
        </div>
      }
    />
  )
}

export default DocumentExampleModal
