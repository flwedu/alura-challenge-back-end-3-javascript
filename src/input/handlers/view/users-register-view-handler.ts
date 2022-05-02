import { Request, Response } from "express";

export const usersRegisterViewHandler = () =>

    (request: Request, response: Response) => {

        response.render("register");
    }
