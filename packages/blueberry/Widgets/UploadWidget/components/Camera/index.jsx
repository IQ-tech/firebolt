import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

import { ConfirmationModal } from "iq-blueberry"

import TakePictureButton from "./TakePictureButton"
import useCamera from "./hook"

import "./style.styl"

const Camera = ({
  showMask = false,
  maskType,
  facing = "user",
  format = "png",
  reviewImageTitle,
  reviewImageText,
  onTakePicture,
  outputType = "dataURL",
  closeStreamOnTakePicture = false,
}) => {
  const {
    shouldUseCamera,
    shouldOpenPictureReview,
    imagePath,
    videoRefSetter,
    handleTakePicture,
    handleTakeOtherPhoto,
    handleUseThisPhoto,
    isLocal,
    maskText
  } = useCamera({
    facing,
    format,
    onTakePicture,
    outputType,
    closeStreamOnTakePicture,
  })

  const componentClass = classNames("app-camera", {
    "app-camera--back": facing === "environment",
  })

  if (shouldOpenPictureReview) {
    return (
      <>
        <div className={classNames("image-preview", `-${facing}`)}>
          <img src={imagePath} alt="Upload review" />
        </div>

        <ConfirmationModal
          title={reviewImageTitle}
          text={reviewImageText}
          buttonText="Sim, está boa"
          dangerButtonText="Tirar outra foto"
          hasOverlay={false}
          hasCloseButton={false}
          isActive={true}
          handleDangerButton={handleTakeOtherPhoto}
          handleButton={handleUseThisPhoto}
          hasButtons
        />
      </>
    )
  }

  if (!shouldUseCamera) return null

  return (
    <div className={componentClass}>
      <div className={classNames("app-camera__video-holder", `-${maskType || facing}`, { 
        '-show-mask': showMask, 
        '-local': isLocal 
        })}>
        <video
          className={classNames("app-camera__video", `-${facing}`)}
          autoPlay
          playsInline
          ref={videoRefSetter}
        />
      </div>
      <div className="app-camera__actions">
        { showMask && <p className="app-camera__warning">{maskText} e toque em ”<strong>Continuar</strong>”</p> }
        <TakePictureButton showLargeButton={showMask} onClick={handleTakePicture} />
      </div>
    </div>
  )
}

Camera.propTypes = {
  showMask: PropTypes.bool,
  maskType: PropTypes.oneOf(["user", "cnh", "rg"]),
  facing: PropTypes.oneOf(["user", "environment"]),
  format: PropTypes.oneOf(["png", "jpg"]),
  onTakePicture: PropTypes.func,
  outputType: PropTypes.oneOf(["dataURL", "blob"]),
  closeStreamOnTakePicture: PropTypes.bool,
}

export default Camera
