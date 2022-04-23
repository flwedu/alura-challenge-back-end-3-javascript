import { Router } from "express";
import multer from "multer";
import { encryptor, transactionRepository, userRepository } from "../ExpressApp";
import { FileInputController, LoginUserController, RegisterUserController } from "../input/controllers";
import { VerifyCredentialsController } from "../input/controllers/VerifyCredentialsController";
import { HomeViewController, LoginUserViewController, RegisterUserViewController, UsersViewController } from "../input/view-controllers";

const router = Router();

// Configure multer middleware and add to route
const upload = multer({ dest: "uploads/" });

// Static routes
router.get("/home", new VerifyCredentialsController(userRepository, encryptor).handle, (req, res) => new HomeViewController(transactionRepository).handle(req, res));
router.get("/login", (req, res) => new LoginUserViewController(userRepository).handle(req, res));
router.get("/register", (req, res) => new RegisterUserViewController(userRepository).handle(req, res));
router.get("/users", (req, res) => new UsersViewController(userRepository).handle(req, res));

// POST Routes
router.post("/home", upload.single("files"), (req, res) => new FileInputController(transactionRepository).handle(req, res));
router.post("/register", (req, res) => new RegisterUserController(userRepository, encryptor).handle(req, res));
router.post("/login", (req, res) => new LoginUserController(userRepository, encryptor).handle(req, res));

export default router;