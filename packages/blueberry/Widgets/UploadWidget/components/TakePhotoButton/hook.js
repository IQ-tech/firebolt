import { useState } from 'react'
import { useFirebolt } from '@iq-firebolt/client'
import imageCompression from 'browser-image-compression'

import { imageCompressionOptions } from 'constants'
import { replaceSpecialChars } from 'utils/replaceSpecialChars'
import { buttonTexts, initialLoadingState } from './constants'

export const useTakePhotoButton = ({
  fileReference,
  side,
  filesReferencesState,
}) => {
  const { uploadFile, currentStep } = useFirebolt({ fileReference })
  const [filesReferences, setFilesReferences] = filesReferencesState

  const currentFileReference = typeof fileReference === 'string' 
  ? fileReference 
  : Object.keys(filesReferences).find(key => key.includes(side))

  const [shouldOpenCamera, setShouldOpenCamera] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [isLoadingUpload, setIsLoadingUpload] = useState(initialLoadingState)
  const [buttonText, setButtonText] = useState(buttonTexts.initial[side])

  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)

  function openCamera() {
    setShouldOpenCamera(true)
  }

  function openDocumentModal() {
    setIsDocumentModalOpen(true)
  }

  function closeDocumentModal() {
    setIsDocumentModalOpen(false)
  }

  function handleDocumentModalButton() {
    openCamera()
    closeDocumentModal()
  }

  function handleButtonCameraOption() {
    if (currentStep?.data?.slug === 'identification_data') {
      openDocumentModal()
    } else {
      openCamera()
    }
  }

  async function uploadCameraImage(fileBlob) {
    setShouldOpenCamera(false)
    await handleUpload(side, fileBlob)
  }

  async function handleUpload(side, file) {
    const currentFile = fileReference[side]
      ? fileReference[side]
      : fileReference

    if (file?.name) {
      Object.defineProperty(file, 'name', {
        writable: true,
        value: replaceSpecialChars(file.name),
      })
    }

    const compressedFile = await imageCompression(file, imageCompressionOptions)

    setIsLoadingUpload({ ...isLoadingUpload, [side]: true })
    setButtonText(buttonTexts.loading)

    uploadFileToBackend(compressedFile, currentFile, file)
  }

  function uploadFileToBackend(compressedFile, currentFile, file) {
    uploadFile(compressedFile, currentFile)
      .then(() => {
        setFilesReferences({ ...filesReferences, [currentFileReference]: file })
        setButtonText(buttonTexts.finished[side])
      })
      .catch(() => {
        setButtonText(buttonTexts.error)
        setTimeout(() => setButtonText(buttonTexts.initial[side]), 5000)
      })
      .finally(() => setIsLoadingUpload({ ...isLoadingUpload, [side]: false }))
  }

  function showConfirmationModal(e) {
    e.stopPropagation()
    setIsModalVisible(true)
  }

  function hideConfirmationModal() {
    setIsModalVisible(false)
  }

  function handleDelete() {
    hideConfirmationModal()
    setButtonText(buttonTexts.initial[side])

    if (!Array.isArray(fileReference)) {
      return setFilesReferences({
        ...filesReferences,
        [currentFileReference]: '',
      })
    }

    const newRefs = filesReferences?.reduce(
      (acc, nxt) => ({ ...acc, [nxt]: '' }),
      {}
    )

    setFilesReferences({ ...filesReferences, ...newRefs })
  }

  return {
    openDocumentModal,
    handleDocumentModalButton,
    closeDocumentModal,
    isDocumentModalOpen,
    shouldOpenCamera,
    openCamera,
    uploadCameraImage,
    isLoadingUpload,
    buttonText,
    showConfirmationModal,
    isModalVisible,
    hideConfirmationModal,
    handleDelete,
    currentFileReference,
    handleButtonCameraOption,
  }
}
