//@ts-nocheck
import { NextFunction, Request, Response } from "express";
import BusinessRuleError from "../../application/errors/BusinessRuleError";
import { ErrorMessage } from "../../application/errors/ErrorMessage";
import { RepositoriesSource } from "../../output/repositories/RepositoriesSource";

export class VerifyCredentialsController {

    constructor(private readonly repositories: RepositoriesSource) { };

    async handle(request: Request, response: Response, next: NextFunction) {
        try {
            const session = request.session;
            const user = await this.repositories.users.findById(session.userId);
            if (!user.active) throw new BusinessRuleError(ErrorMessage.USER_INACTIVE());
            next();
        } catch (err) {
            response.redirect("/login");
        }
    }
}