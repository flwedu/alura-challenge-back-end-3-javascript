import { Request, Response } from "express";

export class LogoutUserController {

    constructor() { };

    async handle(request: Request, response: Response) {

        const session = request.session;

        try {
            session.destroy(() => { });
            response.redirect("/login");
        } catch (err) {
            console.error(err);
        }
    }
}