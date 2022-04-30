import { configureExpressApp } from "./ExpressApp";
import { getInMemoryRepositories } from "./output/repositories/RepositoriesSource";
import configureRouter from "./routes";
import Encryptor from "./security/Encryptor";

const encryptor = new Encryptor(process.env.SECRET);
const repositories = getInMemoryRepositories();

//Add default user
(async () => {
    await repositories.userRepository.save(
        {
            id: "1",
            email: "admin@email.com.br",
            name: "Admin",
            password: await encryptor.hashPassword("123999"),
            active: true
        });
})();

const router = configureRouter(repositories, encryptor);
const app = configureExpressApp(router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}/`))