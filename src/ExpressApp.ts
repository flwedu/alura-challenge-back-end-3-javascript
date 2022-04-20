import Express from "express";
import multer from "multer";
import { Transaction } from "./application/domain/Transaction";
import { FileInputController } from "./input/controllers/FileInputController";
import { IndexViewController } from "./input/view-controllers/IndexViewController";
import { InMemoryRepository } from "./output/repositories/test/InMemoryRepository";

const app = Express();
const transactionRepository = new InMemoryRepository<Transaction>();

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
app.get("/users", (req, res) => {
    res.render("users")
})

// API Routes
app.post("/", upload.single("files"), (req, res) => new FileInputController(transactionRepository).handle(req, res));

export { app };
