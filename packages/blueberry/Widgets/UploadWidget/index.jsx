import React from "react"
import { Message } from 'iq-blueberry'

import { TakePhotoButton } from './components/TakePhotoButton'
import { useState } from "react"
import { useHandlers } from "./hooks/handlers"
import { useConditionals } from "./hooks/conditionals"


const UploadWidget = ({
  hasError,
  onChange,
  value,
  isRequired,
  onBlur,
  label,
  slug,
  uploadLabels
}) => {
  const filesReferencesState = useState()

  const { docType } = useHandlers({ fileReference: slug })
  const { side, showMask, fieldDescription, hasSimpleDescription,
		hasMessage, isFront } = useConditionals({ fileReference: slug, uploadLabels })

  return (
    <div className="simple-upload__container">
		<p className="iq-field-base__label">
			{label}
			<span className="iq-field-base__required">*</span>
		</p>

		<TakePhotoButton
			showMask={showMask}
			maskType={docType}
			side={side}
			docType={docType}
			fileReference={slug}
			filesReferencesState={filesReferencesState}
		/>

		{ isFront && hasSimpleDescription && 
			<p className="simple-upload__desc">{fieldDescription}</p> }

		{ isFront && hasMessage && 
			<Message isOpen text={fieldDescription} type="warning" /> }

	</div> )
}

export default UploadWidget
