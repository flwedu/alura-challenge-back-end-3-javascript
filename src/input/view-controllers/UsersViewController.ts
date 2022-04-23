import { Request, Response } from "express";
import { User } from "../../application/domain/User";
import { LoadAllUsersUseCase } from "../../application/useCases/user/LoadAllUsersUseCase";
import IRepository from "../../output/repositories/IRepository";
import { UserModel } from "../model/UserModel";

export class UsersViewController {

    constructor(private readonly repository: IRepository<User>) { };

    async handle(request: Request, response: Response) {
        const usersEntities = await new LoadAllUsersUseCase(this.repository).execute();
        const users = usersEntities.map(el => new UserModel({ ...el }));

        return response.render("users", { users });
    }
}