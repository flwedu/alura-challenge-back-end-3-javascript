import crypto from "crypto";
import { User } from "./application/domain/User";
import "dotenv/config"
import { configureExpressApp } from "./ExpressApp";
import { getInMemoryRepositories, getMySQLTestRepositories } from "./output/repositories/RepositoriesSource";
import configureRouter from "./routes";
import Encryptor from "./security/Encryptor";

const encryptor = new Encryptor(process.env.SECRET);
const repositories = getInMemoryRepositories();
let connection = repositories.connection;

// Running async app
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
// Graceful shutdown app app
const closeSignals = ["SIGTERM", "SIGINT", "SIGKILL"]
closeSignals.forEach(signal => process.on(signal, () => GracefulCloseApplication(signal)))

process.on('exit', (code) => {
    console.log('Exit signal received', code)
})

function GracefulCloseApplication(code: any) {
    if (connection) {
        connection.close()
    }
    console.log("\n Shutdown command received... closing application with ", code);
    process.exit(code);
}
