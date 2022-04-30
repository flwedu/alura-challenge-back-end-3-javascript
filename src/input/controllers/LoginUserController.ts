import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/useCases/user/LoginUserUseCase";
import { RepositoriesSource } from "../../output/repositories/RepositoriesSource";
import { IEncryptor } from "../../security/IEncryptor";

export class LoginUserController {

    constructor(private readonly repositories: RepositoriesSource, private readonly encryptor: IEncryptor) { };

    async handle(request: Request, response: Response, loginErrorView: any) {
        const { email, password } = request.body;

        try {
            const userId = await new LoginUserUseCase(this.repositories.users, this.encryptor).execute({ email, password });
            //@ts-ignore
            request.session.userId = userId;
            return response.redirect("/home");
        } catch (err) {
            //@ts-ignore
            return loginErrorView.handle(request, response, err);
        }
    }
}