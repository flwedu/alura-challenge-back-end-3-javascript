import { Request, Response } from "express";

export const suspectsListViewHandler = () =>

    async (request: Request, response: Response) => {

        return response.render("suspects", { transactions: [], agencies: [], accounts: [] });
    }
