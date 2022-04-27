//@ts-nocheck
import { Request, Response, NextFunction } from "express";
import { User } from "../../application/domain/User";
import BusinessRuleError from "../../application/errors/BusinessRuleError";
import { ErrorMessage } from "../../application/errors/ErrorMessage";
import IRepository from "../../output/repositories/IRepository";
import { IEncryptor } from "../../security/IEncryptor";

export class VerifyCredentialsController {

    constructor(private readonly repository: IRepository<User>, private readonly encryptor: IEncryptor) { };

    async handle(request: Request, response: Response, next: NextFunction) {
        const session = request.session;
        try {
            const user = await this.repository.findById(session.userId);
            if (!user.active) throw new BusinessRuleError(ErrorMessage.USER_INACTIVE());
            next();
        } catch (err) {
            response.redirect("/login");
        }
    }
}