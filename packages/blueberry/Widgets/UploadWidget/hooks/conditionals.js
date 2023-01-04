import { isMobile } from 'utils/getDevice'

import useHasImageError from "hooks/useHasImageError"

export const useConditionals = ({ fileReference, uploadLabels }) => {
	const stepsWithoutMask = ['residence_proof']
	const stepsWithMessage = ['income_proof']

	const side = fileReference.includes("back") ? "back" : "front"
	const isFront = side === "front"
	
	const modalErrorButtonText = isMobile() 
	? 'Tirar foto' 
	: 'Enviar foto'
	
	const modalErrorHasCloseButton = !isMobile()
	const imageErrorsFound = useHasImageError()
	
	const fieldLabel = fileReference?.front
	? 'Foto da Frente do documento'
	: uploadLabels?.field
	
	const fieldDescription = uploadLabels?.description
	? uploadLabels.description
	: ''
	
	const showMask = stepsWithoutMask.includes(fileReference) ? false : true

	const hasSimpleDescription = !!fieldDescription && !stepsWithMessage.includes(fileReference)
	const hasMessage 		   = !!fieldDescription && stepsWithMessage.includes(fileReference)

	return {
		side,
		showMask,
		fieldLabel,
		fieldDescription,
		modalErrorButtonText,
		modalErrorHasCloseButton,
		imageErrorsFound,
		hasSimpleDescription,
		hasMessage,
		isFront
	}
}