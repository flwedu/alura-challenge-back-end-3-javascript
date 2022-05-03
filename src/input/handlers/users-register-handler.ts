import { NextFunction, Request, Response } from "express"
import { RegisterUserUseCase } from "../../application/useCases/user/RegisterUserUseCase"
import { RepositoriesSource } from "../../output/repositories/RepositoriesSource"
import { IEncryptor } from "../../security/IEncryptor"

export const usersRegisterHandler = (
  repositories: RepositoriesSource,
  encryptor: IEncryptor
) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { name, email } = request.body

    try {
      await new RegisterUserUseCase(repositories.users, encryptor).execute({
        name,
        email,
      })
      return response.redirect("/users")
    } catch (err) {
      next(err)
    }
  }
}
