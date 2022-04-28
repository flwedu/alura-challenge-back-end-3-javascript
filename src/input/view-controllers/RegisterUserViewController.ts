import { Request, Response } from "express";

export class RegisterUserViewController {

    constructor() { };

    async handle(request: Request, response: Response) {

        return response.render("register");
    }
}