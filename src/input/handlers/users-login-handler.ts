import { Request, Response } from "express"
import { LoginUserUseCase } from "../../application/useCases/user/LoginUserUseCase"
import { RepositoriesSource } from "../../output/repositories/RepositoriesSource"
import { IEncryptor } from "../../security/IEncryptor"

export const usersLoginHandler = (
  repositories: RepositoriesSource,
  encryptor: IEncryptor
) => {
  return async (request: Request, response: Response) => {
    const { email, password } = request.body

    try {
      const userId = await new LoginUserUseCase(
        repositories.users,
        encryptor
      ).execute({ email, password })
      //@ts-ignore
      request.session.userId = userId
      return response.redirect("/home")
    } catch (error) {
      //@ts-ignore
      return response.render("login", { error })
    }
  }
}
