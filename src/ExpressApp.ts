import "dotenv/config";
import Express from "express";
import session from "express-session";
import { InMemoryTransactionRepository } from "./output/repositories/test/InMemoryTransactionRepository";
import { InMemoryUserRepository } from "./output/repositories/test/InMemoryUserRepository";
import Encryptor from "./security/Encryptor";
import routes from "./routes"

const app = Express();
const encryptor = new Encryptor(process.env.SECRET);
const transactionRepository = new InMemoryTransactionRepository();
const userRepository = new InMemoryUserRepository();

// Temp: Registering admin login throught IIFE
(async () => {
    await userRepository.save(
        {
            id: "1",
            email: "admin@email.com.br",
            name: "Admin",
            password: "123999"
        });
})();

// Set view engine to ejs
app.set("view engine", "ejs");

// Middlewares
app.use(Express.static("public"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(Express.static("public"));
app.use("/", routes);

export { app, transactionRepository, userRepository, encryptor };
