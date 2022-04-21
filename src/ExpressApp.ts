import "dotenv/config";
import Express from "express";
import multer from "multer";
import { FileInputController } from "./input/controllers/FileInputController";
import { RegisterUserController } from "./input/controllers/RegisterUserController";
import { IndexViewController } from "./input/view-controllers/IndexViewController";
import { UsersViewController } from "./input/view-controllers/UsersViewController";
import { InMemoryTransactionRepository } from "./output/repositories/test/InMemoryTransactionRepository";
import { InMemoryUserRepository } from "./output/repositories/test/InMemoryUserRepository";
import Encryptor from "./security/Encryptor";

const app = Express();
const encryptor = new Encryptor(process.env.SECRET);
const transactionRepository = new InMemoryTransactionRepository();
const userRepository = new InMemoryUserRepository();

// Temp: Registering admin login throught IIFE
(async () => {
    await userRepository.save({ id: "1", email: "admin@email.com.br", name: "Admin", password: "123999" });
})();

// Set view engine to ejs
app.set("view engine", "ejs");

// Middlewares
app.use(Express.static("public"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
// Configure multer middleware and add to route
const upload = multer({ dest: "uploads/" });

// Static routes
app.get("/", (req, res) => new IndexViewController(transactionRepository).handle(req, res))
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/users", (req, res) => new UsersViewController(userRepository).handle(req, res))

// POST Routes
app.post("/", upload.single("files"), (req, res) => new FileInputController(transactionRepository).handle(req, res));
app.post("/register", (req, res) => new RegisterUserController(userRepository, encryptor).handle(req, res))

export { app };
