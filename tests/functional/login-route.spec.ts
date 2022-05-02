import { SetupExpressServer } from "@src/ExpressApp"
import { getInMemoryRepositories } from "@src/output/repositories/RepositoriesSource"
import Encryptor from "@src/security/Encryptor"
import supertest from "supertest"

describe('Login routes tests', () => {

    const encryptor = new Encryptor("123")
    const repositories = getInMemoryRepositories()
    const server = new SetupExpressServer(repositories, encryptor)
    server.init()

    test('should load login page', async () => {

        const { body, status } = await supertest(server.getApp()).get("/login")

        expect(status).toEqual(200)
    })
})