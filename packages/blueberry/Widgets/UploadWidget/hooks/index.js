import { useState, useEffect } from 'react'

const useUploadFile = ({ fileReference, uploadedFilesState, handleImageErrors, imageErrorsFound }) => {
  const [uploadedFiles, setUploadedFiles] = uploadedFilesState
  const [addedAllRequiredFiles, setAddedAllRequiredFiles] = useState(false)

  const filesReferencesKeys =
    typeof fileReference === 'object'
      ? Object.values(fileReference)
      : [fileReference]

  const initialFilesReferences = filesReferencesKeys.reduce(
    (allFilesRefs, key) => ({ ...allFilesRefs, [key]: '' }),
    {}
  )

  const [filesReferences, setFilesReferences] = useState(initialFilesReferences)

  useEffect(() => {
    const hasUploadedAllRequiredFiles = Object.keys(filesReferences).every(
      (key) => !!filesReferences[key]
    )

    setUploadedFiles({ ...uploadedFiles, ...filesReferences })
    setAddedAllRequiredFiles(hasUploadedAllRequiredFiles)
  }, [filesReferences])

  useEffect(() => {
    const uploadedFilesRefs = Object.keys(uploadedFiles)
    const currentFilesRefs = Object.keys(initialFilesReferences)

    if (uploadedFilesRefs.length > 0) {
      const uploadsToPersist = currentFilesRefs.reduce((acc, ref) => {
        return uploadedFiles[ref] ? { ...acc, [ref]: uploadedFiles[ref] } : acc
      }, {})

      setFilesReferences({ ...filesReferences, ...uploadsToPersist })
    }
  }, [])

  useEffect(() => {
    handleImageErrors(imageErrorsFound)
  }, [])

  return {
    addedAllRequiredFiles,
    filesReferencesState: [filesReferences, setFilesReferences],
  }
}

export default useUploadFile
