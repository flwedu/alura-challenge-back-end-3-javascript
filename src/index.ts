import crypto from "crypto";
import { User } from "./application/domain/User";
import { configureExpressApp } from "./ExpressApp";
import { getInMemoryRepositories } from "./output/repositories/RepositoriesSource";
import configureRouter from "./routes";
import Encryptor from "./security/Encryptor";

const encryptor = new Encryptor(process.env.SECRET);
const repositories = getInMemoryRepositories();

//Add default user
(async () => {
    await repositories.users.save(
        {
            id: crypto.randomUUID(),
            email: "admin@email.com.br",
            name: "Admin",
            password: await encryptor.hashPassword("123999"),
            active: true
        } as User);
})();

const router = configureRouter(repositories, encryptor);
const app = configureExpressApp(router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}/`));

// Caught exceptions
process.on("uncaughtException", (error, origin) => {
    console.error(`${origin} signal received: ${error}`);
    app.render("error", { errorCode: 500, error })
})

// Shutdown app
process.on("SIGINT", function (code) {
    console.log("Shutdown command received... closing application with ", code);
    //@ts-ignore
    process.exit(code);
})
