import Express from "express";
import multer from "multer";
import { FileInputController } from "./input/controllers/FileInputController";
import { IndexViewController } from "./input/view-controllers/IndexViewController";
import { InMemoryTransactionRepository } from "./output/repositories/test/InMemoryTransactionRepository";

const app = Express();
const transactionRepository = new InMemoryTransactionRepository();

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
