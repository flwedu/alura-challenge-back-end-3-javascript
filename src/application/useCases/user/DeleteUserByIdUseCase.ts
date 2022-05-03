import IUserRepository from "../../../output/repositories/IUserRepository"
import BusinessRuleError from "../../errors/BusinessRuleError"
import { ErrorMessage } from "../../errors/ErrorMessage"

export class DeleteUserByIdUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(props: {
    actualId: string
    idToDelete: string
  }): Promise<string> {
    try {
      // Verify if the logged user exists
      const user = await this.repository.findById(props.actualId)
      // Check if the user is Admin
      if (user.name == "Admin")
        throw new BusinessRuleError(ErrorMessage.CANT_DELETE.ADMIN())

      // Check if the logged user id == idToDelete
      if (props.actualId == props.idToDelete)
        throw new BusinessRuleError(ErrorMessage.CANT_DELETE.LOGGED_USER())

      const deletedId = await this.repository.delete(props.idToDelete)
      return Promise.resolve(deletedId)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
