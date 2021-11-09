import { useState, useEffect, useRef } from "react";
import { uploadFilesToBucket } from "@iq-firebolt/client-core";
import { File as FbFile } from "@iq-firebolt/client-core";

export default function useFilesUpload({
  uploadEndpoint,
  onChange,
  onBlur,
  slug,
  sizeLimit = 3000000,
  allowedExtensions = [],
  maxFiles = 1,
  // custom events
  onGetInvalidFiles,
  onExceedFileLimit,
  onUploadError,
  exceedFileLimitMessage = "Upload file limit exceeded",
  fileUploadErrorMessage = "File upload failed",
} = {}) {
  const inputElRef = useRef(null);
  const multiple = maxFiles > 1;
  const [accept, setAccept] = useState();
  const [fileList, setFileList] = useState([]);

  const [sentFiles, setSentFiles] = useState(false);
  const [updatedForm, setUpdatedForm] = useState(false);
  const [internalError, setInternalError] = useState("");

  useEffect(_formatAllowedExtensions, [allowedExtensions]);
  /* useEffect(_updateForm, [sentFiles]); */

  function _formatAllowedExtensions() {
    const isAllowedListEmpty =
      Array.isArray(allowedExtensions) && allowedExtensions.length === 0;
    if (isAllowedListEmpty) return undefined;
    const extensionsAttr = allowedExtensions
      .map((extension) => `.${extension}`)
      .join(", ");

    setAccept(extensionsAttr);
  }

  function _updateForm() {
    if (!!onChange && !!sentFiles) {
      onChange(fileList);
      setUpdatedForm(true);
    }
  }

  function onChangeFileInput(e = {}) {
    /** @type {HTMLInputElement} */
    const target = e?.target;
    const files = target?.files || [];
    const filesArray = Array.from(files);
    const exceedsLimit = fileList.length + filesArray.length > maxFiles;

    if (exceedsLimit) {
      if (!!onExceedFileLimit) {
        onExceedFileLimit({ maxFiles, exceededLimit: exceedsLimit });
      }
      setInternalError(exceedFileLimitMessage);
    } else {
      const validFiles = filesArray.filter(
        (file) => !!_checkInputFile(file).isValid
      );

      const invalidFiles = filesArray
        .map((file) => ({
          file,
          validation: _checkInputFile(file),
        }))
        .filter((file) => !file.validation.isValid)
        .map(({ file, validation }) => ({
          name: file.name,
          size: file.size,
          message: validation.message,
        }));

      if (validFiles.length) {
        setInternalError("");
        _sendFiles(validFiles);
      }
      if (invalidFiles.length && !!onGetInvalidFiles) {
        onGetInvalidFiles(invalidFiles);
      }
    }
  }

  /** @returns {{isValid: boolean, message: string}} */
  function _checkInputFile(file) {
    const { name, size } = file;
    const extension = name.split(".")[1];
    const alreadyHasBeenAdded = fileList.some(
      (file) => file.name === name && file.size === size
    );
    const hasValidExtension =
      allowedExtensions.length > 0 && allowedExtensions.includes(extension);
    const hasValidSize = size <= sizeLimit;

    if (alreadyHasBeenAdded) {
      return {
        file,
        isValid: false,
        message: `o arquivo ${name} já foi adicionado`,
      };
    } else if (!hasValidExtension) {
      return {
        file,
        isValid: false,
        message: `o arquivo ${name} não tem um formato válido`,
      };
    } else if (!hasValidSize) {
      return {
        file,
        isValid: false,
        message: `o arquivo ${name} excede o limite de 3mb`,
      };
    } else {
      return { file, isValid: true };
    }
  }

  function _sendFiles(files) {
    uploadFilesToBucket(uploadEndpoint, { files, slug })
      .then((response) => {
        const uploadReference = response?.data;
        const sentFiles = files.map(
          (file) =>
            new FbFile({
              storageReference: uploadReference,
              name: file.name,
              size: file.size,
              extension: file.name.split(".")[1],
            })
        );

        setFileList(sentFiles);
        setSentFiles(true);
      })
      .catch((err) => {
        console.error("error on upload files", err);
        if (!!onUploadError) onUploadError();
      });
  }

  return {
    onChangeFileInput,
    accept,
    multiple,
    fileList,
    inputElRef,
    internalError,
  };
}
