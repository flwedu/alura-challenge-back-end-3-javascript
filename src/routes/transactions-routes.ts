import { Router } from "express";
import { SuspectsViewController } from "../input/view-controllers/SuspectsViewContoller";
import { RepositoriesSource } from "../output/repositories/RepositoriesSource";

export function configureTransactionsRoutes(router: Router, repositories: RepositoriesSource) {

    router.get("/suspects", (req, res) => new SuspectsViewController(repositories).handle(req, res))
}