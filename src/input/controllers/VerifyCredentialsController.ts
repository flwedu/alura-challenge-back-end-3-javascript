import { Request, Response, NextFunction } from "express";
import { User } from "../../application/domain/User";
import IRepository from "../../output/repositories/IRepository";
import { IEncryptor } from "../../security/IEncryptor";

export class VerifyCredentialsController {

    constructor(private readonly repository: IRepository<User>, private readonly encryptor: IEncryptor) { };

    async handle(request: Request, response: Response, next: NextFunction) {
        const session = request.session;
        try {
            //@ts-ignore
            await this.repository.findById(session.userId);
            next();
        } catch (err) {
            request.session.destroy(() => { });
            response.redirect("/login");
        }
    }
}