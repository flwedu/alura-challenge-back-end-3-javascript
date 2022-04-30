import { Request, Response } from "express";
import { LoadAllUsersUseCase } from "../../application/useCases/user/LoadAllUsersUseCase";
import { RepositoriesSource } from "../../output/repositories/RepositoriesSource";
import { UserModel } from "../model/UserModel";

export class UsersViewController {

    constructor(private readonly repositories: RepositoriesSource) { };

    async handle(request: Request, response: Response) {
        const usersEntities = await new LoadAllUsersUseCase(this.repositories.users).execute();
        const users = usersEntities.map(el => new UserModel({ ...el }));

        return response.render("users", { users });
    }
}