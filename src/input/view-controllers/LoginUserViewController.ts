import { Request, Response } from "express";

export class LoginUserViewController {

    constructor() { };

    async handle(request: Request, response: Response, err?: Error) {

        if (!err) return response.render("login", { error: "" });
        return response.render("login", { error: err });
    }
}