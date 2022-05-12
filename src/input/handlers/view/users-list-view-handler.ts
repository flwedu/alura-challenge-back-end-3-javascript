import { Request, Response } from "express"
import { LoadAllUsersUseCase } from "../../../application/useCases/user/LoadAllUsersUseCase"
import { RepositoriesSource } from "../../../output/repositories/RepositoriesSource"
import { UserModel } from "../../model/UserModel"

export const usersListViewHandler =
  (repositories: RepositoriesSource) =>
  async (request: Request, response: Response) => {
    const usersEntities = await new LoadAllUsersUseCase(
      repositories.users
    ).execute()
    const users = usersEntities.map((el) => new UserModel({ ...el }))

    return response.render("users", { users })
  }
