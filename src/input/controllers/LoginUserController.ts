import { Request, Response } from "express";
import { User } from "../../application/domain/User";
import { LoginUserUseCase } from "../../application/useCases/user/LoginUserUseCase";
import IRepository from "../../output/repositories/IRepository";
import { IEncryptor } from "../../security/IEncryptor";
import { LoginUserViewController } from "../view-controllers";

export class LoginUserController {

    constructor(private readonly repository: IRepository<User>, private readonly encryptor: IEncryptor) { };

    async handle(request: Request, response: Response, loginErrorView: any) {
        const { email, password } = request.body;

        try {
            const userId = await new LoginUserUseCase(this.repository, this.encryptor).execute({ email, password });

            //@ts-ignore
            request.session.userId = userId;
            console.log(request.session);
            return response.redirect("/home");
        } catch (err) {
            //@ts-ignore
            return loginErrorView.handle(request, response, err);
        }
    }
}