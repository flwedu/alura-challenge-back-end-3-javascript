import { Request, Response } from "express";

export class SuspectsViewController {

    constructor() { };

    async handle(request: Request, response: Response) {

        return response.render("suspects", { transactions: [], agencies: [], accounts: [] });
    }
}