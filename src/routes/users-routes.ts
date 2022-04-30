import { Router } from "express";
import { LoginUserController, LogoutUserController, RegisterUserController } from "../input/controllers";
import { LoginUserViewController, RegisterUserViewController, UsersViewController } from "../input/view-controllers";
import { RepositoriesSource } from "../output/repositories/RepositoriesSource";
import { IEncryptor } from "../security/IEncryptor";

export function configureUsersRoutes(router: Router, repositories: RepositoriesSource, encryptor: IEncryptor) {

    router.post("/register",
        (req, res, next) => new RegisterUserController(repositories, encryptor).handle(req, res, next));
    router.post("/login",
        (req, res) => new LoginUserController(repositories, encryptor).handle(req, res, new LoginUserViewController())
    );

    router.get("/login",
        //@ts-ignore
        (req, res) => new LoginUserViewController().handle(req, res));
    router.get("/register",
        (req, res) => new RegisterUserViewController().handle(req, res));
    router.get("/users",
        (req, res) => new UsersViewController(repositories).handle(req, res));
    router.get("/logout",
        (req, res) => new LogoutUserController().handle(req, res));
}