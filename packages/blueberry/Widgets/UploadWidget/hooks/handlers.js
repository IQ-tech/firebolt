import { useState } from "react"

export const useHandlers = ({ fileReference }) => {
	const mainFileRef = fileReference?.front || fileReference
	
	const [docType, setDocType] = useState()
	const [modalErrorOpen, setModalErrorOpen] = useState(false)
	const [modalCloseClicked, setModalCloseClicked] = useState(false)
	const [imageErrors, setImageErrors] = useState({})


	const handleCloseModalError = () => {
		setModalErrorOpen(false)
		setModalCloseClicked(true)
	}

	const handleImageErrors = (imageErrorsFound) => {
	  if (
		!modalCloseClicked &&
		modalErrorOpen !== imageErrorsFound?.invalidImage
	  ) {
		setImageErrors(imageErrorsFound)
		setModalErrorOpen(imageErrorsFound?.invalidImage)
	  }
	}

	const closeModalClicked = () => {
	  handleCloseModalError(mainFileRef, fileReference)
	}
	const handleChangeFields = (inputConfig, { value }) => {
		if (inputConfig?.slug === 'brazil_id_issuer') {
		  const docName = value === '31' ? 'CNH' : 'RG'
		  setDocType(docName)
		}
	}

	return {
		docType,
		imageErrors,
		modalErrorOpen,
		closeModalClicked,
		handleChangeFields,
		handleImageErrors
	}
}