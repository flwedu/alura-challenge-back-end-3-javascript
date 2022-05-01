import { Router } from "express";
import { SuspectsController } from "../input/controllers/suspects-controller";
import { SuspectsViewController } from "../input/view-controllers/SuspectsViewContoller";
import { RepositoriesSource } from "../output/repositories/RepositoriesSource";

export function configureTransactionsRoutes(router: Router, repositories: RepositoriesSource) {

    router.get("/suspects", (req, res) => new SuspectsViewController().handle(req, res))
    router.post("/suspects", (req, res) => new SuspectsController(repositories).execute(req, res))
}