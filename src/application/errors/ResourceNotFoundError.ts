import { ErrorMessage } from "./ErrorMessage"

export default class ResourceNotFoundError extends Error {
  constructor(id?: string) {
    const message = id ? ErrorMessage.RESOURCE_NOT_FOUND(id) : ""
    super(message)
    this.name = "ResourceNotFoundError"
  }
}
