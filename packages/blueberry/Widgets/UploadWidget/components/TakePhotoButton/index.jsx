import React from "react"
import classNames from 'classnames'

import { ConfirmationModal } from 'iq-blueberry'

import DocumentExampleModal from '../DocumentExampleModal'
import Camera from '../Camera'
import Img from '../Img'

import { useTakePhotoButton } from './hook'
import './style.styl'

export const TakePhotoButton = ({
  showMask = false,
  maskType,
  fileReference,
  side,
  docType,
  filesReferencesState,
}) => {
  const {
    closeDocumentModal,
    handleDocumentModalButton,
    isDocumentModalOpen,
    shouldOpenCamera,
    uploadCameraImage,
    buttonText,
    isLoadingUpload,
    showConfirmationModal,
    isModalVisible,
    hideConfirmationModal,
    handleDelete,
    currentFileReference,
    handleButtonCameraOption,
  } = useTakePhotoButton({ fileReference, side, filesReferencesState })

  const [filesReferences] = filesReferencesState
  const hasUploadedSide = !!filesReferences[currentFileReference]

  return (
    <>
      <div
        className={classNames('bb-take-photo', {
          '-uploaded': hasUploadedSide,
        })}
        onClick={handleButtonCameraOption}>
        <div className="bb-take-photo__content">
          <div className="bb-take-photo__content-first">
            {isLoadingUpload[side] || hasUploadedSide ? (
              <Img src="images/bb/icons/document-blue.svg" />
            ) : (
              <Img src="images/camera-icon.svg" />
            )}
            {buttonText}
          </div>
          {!hasUploadedSide && <Img src="images/arrow-right-grey.svg" />}
        </div>

        {hasUploadedSide && (
          <div
            className="bb-take-photo__del-file"
            onClick={showConfirmationModal}>
            <Img src="images/trash-can.svg" />
          </div>
        )}
      </div>

      <ConfirmationModal
        title="Tem certeza que deseja deletar as imagens?"
        text="Novas imagens do documento serão necessárias para darmos continuidade."
        dangerButtonText="Deletar imagens"
        buttonText="Cancelar"
        isActive={isModalVisible}
        handleCloseModal={hideConfirmationModal}
        handleDangerButton={handleDelete}
        handleButton={hideConfirmationModal}
      />
      <DocumentExampleModal
        side={side}
        docType={docType}
        handleOpenModal={handleDocumentModalButton}
        isActive={isDocumentModalOpen}
        handleCloseModal={closeDocumentModal}
      />
      {shouldOpenCamera ? (
        <Camera
          showMask={showMask}
          maskType={maskType}
          facing="environment"
          outputType="blob"
          reviewImageTitle="A foto está nítida?"
          reviewImageText="Seus olhos devem estar abertos e visíveis, óculos escuros, óculos de grau ou chapéus não devem ser usados, a fotografia deve ser tirada de frente, de preferência com uma parede branca de fundo."
          closeStreamOnTakePicture
          onTakePicture={uploadCameraImage}
        />
      ) : null}
    </>
  )
}
