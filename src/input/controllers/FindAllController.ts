import { Request, Response } from "express";
import IRepository from "../../output/repositories/IRepository";

export class FindAllController {

    constructor(private repository: IRepository<any>) { }

    async handle(request: Request, response: Response) {

        const results = await this.repository.find();
        return response.json(results);
    }
}