import { Router } from "express";
import multer from "multer";
import { FileInputController, LoginUserController, LogoutUserController, RegisterUserController } from "../input/controllers";
import { VerifyCredentialsController } from "../input/controllers/VerifyCredentialsController";
import { HomeViewController, LoginUserViewController, RegisterUserViewController, UsersViewController } from "../input/view-controllers";
import { RepositoriesSource } from "../output/repositories/RepositoriesSource";
import { IEncryptor } from "../security/IEncryptor";

const router = Router();
/**
 * This function receives a repositories wrapper and an instance of an encrypter for pass later to the controllers that will respond to the routes requests.
 * @param {RepositoriesSource} repositories a wrapper to **repositories**
 * @param {IEncryptor} encryptor an encryptor object
 * @returns {Router} the configured **router** object
 */
const configureRouter = (repositories: RepositoriesSource, encryptor: IEncryptor): Router => {

    const userRepository = repositories.userRepository;
    const transactionRepository = repositories.transactionsRepository;

    // Configure multer middleware and add to route
    const upload = multer({ dest: "uploads/" });

    // Credentials middleware
    router.use("/home", (req, res, next) => new VerifyCredentialsController(userRepository, encryptor).handle(req, res, next));
    router.use("/register", (req, res, next) => new VerifyCredentialsController(userRepository, encryptor).handle(req, res, next));
    router.use("/users", (req, res, next) => new VerifyCredentialsController(userRepository, encryptor).handle(req, res, next));

    // Static routes
    router.get("/", (req, res) => res.redirect("/home"));
    router.get("/home", (req, res) => new HomeViewController(transactionRepository).handle(req, res));
    router.get("/login", (req, res) => new LoginUserViewController(userRepository).handle(req, res));
    router.get("/register", (req, res) => new RegisterUserViewController(userRepository).handle(req, res));
    router.get("/users", (req, res) => new UsersViewController(userRepository).handle(req, res));
    router.get("/logout", (req, res) => new LogoutUserController().handle(req, res))

    // POST Routes
    router.post("/home", upload.single("files"), (req, res) => new FileInputController(transactionRepository).handle(req, res));
    router.post("/register", (req, res) => new RegisterUserController(userRepository, encryptor).handle(req, res));
    router.post("/login", (req, res) => new LoginUserController(userRepository, encryptor).handle(req, res));

    return router;
}

export default configureRouter;