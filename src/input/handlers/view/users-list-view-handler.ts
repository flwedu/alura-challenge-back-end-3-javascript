import { LoadAllUsersUseCase } from "@src/application/useCases/user/LoadAllUsersUseCase";
import { UserModel } from "@src/input/model/UserModel";
import { RepositoriesSource } from "@src/output/repositories/RepositoriesSource";
import { Request, Response } from "express";


export const usersListViewHandler = (repositories: RepositoriesSource) =>

    async (request: Request, response: Response) => {

        const usersEntities = await new LoadAllUsersUseCase(repositories.users).execute()
        const users = usersEntities.map(el => new UserModel({ ...el }))

        return response.render("users", { users })
    }
