import Express from "express";
import { FileInputExpressController } from "./input/controllers/FileInputExpressController";
import multer from "multer";

const app = Express();

app.use("/", Express.static("public"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// Configure multer middleware and add to route
const upload = multer({ dest: "uploads/" });

app.post("/submit", upload.single("files"), new FileInputExpressController().handle);

export { app };