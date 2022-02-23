export default class FbFile {
  storageReference: any
  extension: string
  size: number
  name: string
  constructor({
    storageReference,
    extension = String(),
    size = String() || Number(),
    name = String(),
  }) {
    this.storageReference = storageReference
    this.extension = extension
    this.size = Number(size)
    this.name = name
  }
}
