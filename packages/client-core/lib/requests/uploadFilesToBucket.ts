import axios from "axios"


export default async function uploadFiles(endpoint, { files, slug }) {
  const isEndpointValid = typeof endpoint === "string" && !!endpoint
  const filesContructor = Object.getPrototypeOf(files)?.constructor?.name
  const isFileList = filesContructor === "FileList"
  const isFilesValid = isFileList || Array.isArray(files)

  if (!isEndpointValid) throw new TypeError(`Invalid endpoint ${endpoint}`)
  if (!isFilesValid)
    throw new TypeError(`invalid files passed to Firebolt upload files`)

  if (!isFilesValid) throw new Error("invlid files")

  const formData = new FormData()
  Array.from(files).forEach((file: any) => formData.append(slug, file))

  return axios.post(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}
