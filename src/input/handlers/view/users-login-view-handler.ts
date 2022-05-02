import { Request, Response } from "express";

export const usersLoginViewHandler = () =>

    (request: Request, response: Response, error?: Error) => {

        response.render("login", { error })
    }