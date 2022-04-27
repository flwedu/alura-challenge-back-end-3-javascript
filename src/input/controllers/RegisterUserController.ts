import { NextFunction, Request, Response } from "express";
import { User } from "../../application/domain/User";
import { RegisterUserUseCase } from "../../application/useCases/user/RegisterUserUseCase";
import IRepository from "../../output/repositories/IRepository";
import { IEncryptor } from "../../security/IEncryptor";

export class RegisterUserController {

    constructor(private readonly repository: IRepository<User>, private readonly encryptor: IEncryptor) { };

    async handle(request: Request, response: Response, next: NextFunction) {
        const { name, email } = request.body;

        try {
            await new RegisterUserUseCase(this.repository, this.encryptor).execute({ name, email });
            return response.redirect("/users");
        } catch (err) {
            next(err);
        }

    }
}