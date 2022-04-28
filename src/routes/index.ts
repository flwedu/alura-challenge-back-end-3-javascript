import { Router } from "express";
import { VerifyCredentialsController } from "../input/controllers";
import { errorHandler } from "../input/controllers/";
import { RepositoriesSource } from "../output/repositories/RepositoriesSource";
import { IEncryptor } from "../security/IEncryptor";
import { configureTransactionsImportsRoutes } from "./transactions-imports-routes";
import { configureTransactionsRoutes } from "./transactions-routes";
import { configureUsersRoutes } from "./users-routes";

const router = Router();
/**
 * This function receives a repositories wrapper and an instance of an encrypter for pass later to the controllers that will respond to the routes requests.
 * @param {RepositoriesSource} repositories a wrapper to **repositories**
 * @param {IEncryptor} encryptor an encryptor object
 * @returns {Router} the configured **router** object
 */
const configureRouter = (repositories: RepositoriesSource, encryptor: IEncryptor): Router => {

    // Credentials middleware
    const verifyCredentials = new VerifyCredentialsController(repositories.userRepository, encryptor);
    router.use("/home", (req, res, next) => verifyCredentials.handle(req, res, next));
    router.use("/register", (req, res, next) => verifyCredentials.handle(req, res, next));
    router.use("/users", (req, res, next) => verifyCredentials.handle(req, res, next));

    // Configuring routes relcted to entities
    configureTransactionsImportsRoutes(router, repositories);
    configureUsersRoutes(router, repositories, encryptor);
    configureTransactionsRoutes(router, repositories);

    // Errors handlers
    router.use(errorHandler);

    return router;
}

export default configureRouter;