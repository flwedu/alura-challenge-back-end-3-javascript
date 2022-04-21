import { Request, Response } from "express";
import { User } from "../../application/domain/User";
import { LoginUserUseCase } from "../../application/useCases/user/LoginUserUseCase";
import IRepository from "../../output/repositories/IRepository";
import { IEncryptor } from "../../security/IEncryptor";

export class LoginUserController {

    constructor(private readonly repository: IRepository<User>, private readonly encryptor: IEncryptor) { };

    async handle(request: Request, response: Response) {
        const { email, password } = request.body;

        const logged = await new LoginUserUseCase(this.repository, this.encryptor).execute({ email, password });
        if (logged) {
            return response.redirect("/");
        }
        return response.redirect("/login");
    }
}