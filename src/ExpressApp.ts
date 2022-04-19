import Express from "express";
import multer from "multer";
import { Transaction } from "./application/domain/Transaction";
import { FileInputController } from "./input/controllers/FileInputController";
import { FindAllController } from "./input/controllers/FindAllController";
import { InMemoryRepository } from "./output/repositories/test/InMemoryRepository";

const app = Express();
const repository = new InMemoryRepository<Transaction>();

// Set view engine to ejs
app.set("view engine", "ejs");

// Middlewares
app.use(Express.static("public"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// Configure multer middleware and add to route
const upload = multer({ dest: "uploads/" });

app.get("/transactions", async (req, res) => new FindAllController(repository).handle(req, res));
app.post("/submit", upload.single("files"), async (req, res) => await new FileInputController(repository).handle(req, res));

export { app };