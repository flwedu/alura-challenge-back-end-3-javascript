import { Request, Response } from "express";
import { TransactionsImport } from "../../application/domain/TransactionsImport";
import IRepository from "../../output/repositories/IRepository";

export class SuspectsViewController {

    constructor(private readonly repository: IRepository<TransactionsImport>) { };

    async handle(request: Request, response: Response) {

        return response.render("suspects");
    }
}