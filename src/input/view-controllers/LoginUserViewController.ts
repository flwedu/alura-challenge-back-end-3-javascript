import { Request, Response } from "express";
import { User } from "../../application/domain/User";
import IRepository from "../../output/repositories/IRepository";

export class LoginUserViewController {

    constructor(private readonly repository: IRepository<User>) { };

    async handle(request: Request, response: Response) {

        return response.render("login");
    }
}