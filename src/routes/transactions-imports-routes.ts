import { Router } from "express";
import multer from "multer";
import { FileInputController } from "../input/controllers";
import { HomeViewController, TransactionImportDetailsViewController } from "../input/view-controllers";
import { RepositoriesSource } from "../output/repositories/RepositoriesSource";

export function configureTransactionsImportsRoutes(router: Router, repositories: RepositoriesSource) {

    // Configure multer middleware and add to route
    const upload = multer({ dest: "uploads/" });

    router.post("/home", upload.single("files"),
        (req, res) => new FileInputController(repositories).handle(req, res));

    router.get("/",
        (req, res) => res.redirect("/home"));
    router.get("/home",
        (req, res) => new HomeViewController(repositories).handle(req, res));
    router.get("/home/:id",
        (req, res) => new TransactionImportDetailsViewController(repositories).handle(req, res))
}