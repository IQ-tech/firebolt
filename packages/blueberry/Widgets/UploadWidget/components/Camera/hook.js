/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react"
import isClient from "utils/isClient"
import scrollTo from "utils/scrollTo"

export default function useCamera({
  facing,
  format,
  onTakePicture,
  outputType,
  closeStreamOnTakePicture,
} = {}) {
  const [shouldUseCamera, setShouldUseCamera] = useState(false)
  const [videoElementRef, setVideoElementRef] = useState(null)
  const [currentStream, setCurrentStream] = useState(null)
  const [loadedDefaultFacing, setLoadedDefaultFacing] = useState(false)
  const [pictureData, setPictureData] = useState({})
  const [shouldOpenPictureReview, setShouldOpenPictureReview] = useState(false)

  const isLocal = isClient() && window.location.hostname === 'localhost'

  const maskText = facing === 'user'
    ? "Posicione seu rosto na área indicada"
    : "Posicione seu documento na área indicada"

  const videoRefSetter = useCallback((node) => {
    setVideoElementRef(node)
  }, [])

  useEffect(() => {
    setShouldUseCamera(true)
  }, [])

  useEffect(() => {
    if (!!videoElementRef) {
      _openCamera()
    }
  }, [videoElementRef])

  useEffect(() => {
    if (loadedDefaultFacing) {
      _changeCamera()
    }
    setLoadedDefaultFacing(true)
  }, [facing])

  function _closeStreamTracks() {
    const tracks = currentStream?.getTracks() || []
    tracks?.forEach((track) => {
      track?.stop()
    })
  }

  function _changeCamera() {
    _closeStreamTracks()
    _openCamera()
  }

  async function _openCamera() {
    const mediaGetter = !!navigator?.mediaDevices?.getUserMedia
    if (!!mediaGetter) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          height: {
            ideal: 720,
          },
        },
        audio: false,
      })

      setCurrentStream(stream)
      videoElementRef.srcObject = stream
    }
  }

  function handleTakePicture() {
    const virtualCanvas = document.createElement("canvas")
    virtualCanvas.height = videoElementRef.videoHeight
    virtualCanvas.width = videoElementRef.videoWidth
    const canvasContext = virtualCanvas.getContext("2d")

    if (facing === 'user') {
      canvasContext.translate(virtualCanvas.width, 0)
      canvasContext.scale(-1, 1)
    }
    canvasContext.drawImage(videoElementRef, 0, 0)
    const outputFormat = `image/${format}`

    virtualCanvas.toBlob(
      (blob) => {
        setPictureData({
          path: virtualCanvas.toDataURL(outputFormat),
          blob,
        })
      },
      outputFormat,
      1
    )

    if (!!closeStreamOnTakePicture) {
      _closeStreamTracks()
    }
    setShouldOpenPictureReview(true)
  }

  function handleTakeOtherPhoto() {
    setShouldOpenPictureReview(false)
    setPictureData({})
    setShouldUseCamera(true)
  }

  function handleUseThisPhoto() {
    setShouldOpenPictureReview(true)
    if (outputType === "dataURL") {
      onTakePicture(pictureData.path)
    } else if (outputType === "blob") {
      onTakePicture(pictureData.blob)
    }

    scrollTo(0)
  }

  return {
    shouldOpenPictureReview,
    imagePath:
      pictureData.path ||
      (pictureData.blob ? URL.createObjectURL(pictureData?.blob) : null),
    shouldUseCamera,
    videoRefSetter,
    handleTakePicture,
    handleTakeOtherPhoto,
    handleUseThisPhoto,
    isLocal,
    maskText
  }
}
