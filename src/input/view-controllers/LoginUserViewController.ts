import { Request, Response } from "express";

export class LoginUserViewController {

    constructor() { };

    async handle(request: Request, response: Response, error?: Error) {

        return response.render("login", { error });
    }
}