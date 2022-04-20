import { Request, Response } from "express";
import { FindAllFromUserUseCase } from "../../application/useCases/FindAllFromUserUseCase";
import IRepository from "../../output/repositories/IRepository";

export class FindAllController {

    constructor(private repository: IRepository<any>) { }

    async handle(request: Request, response: Response) {

        const results = await new FindAllFromUserUseCase(this.repository).execute(request.params.id);
        return response.json(results);
    }
}