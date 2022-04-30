import { NextFunction, Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/useCases/user/RegisterUserUseCase";
import { RepositoriesSource } from "../../output/repositories/RepositoriesSource";
import { IEncryptor } from "../../security/IEncryptor";

export class RegisterUserController {

    constructor(private readonly repositories: RepositoriesSource, private readonly encryptor: IEncryptor) { };

    async handle(request: Request, response: Response, next: NextFunction) {
        const { name, email } = request.body;

        try {
            await new RegisterUserUseCase(this.repositories.users, this.encryptor).execute({ name, email });
            return response.redirect("/users");
        } catch (err) {
            next(err);
        }

    }
}