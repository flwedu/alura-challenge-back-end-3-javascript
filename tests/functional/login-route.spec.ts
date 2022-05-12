import supertest from "supertest"
import SetupExpressServer from "../config/ExpressApp"
import { getInMemoryRepositories } from "../output/repositories/RepositoriesSource"
import Encryptor from "../security/Encryptor"

describe("Login routes tests", () => {
  const encryptor = new Encryptor("123")
  const repositories = getInMemoryRepositories()

  test("should load login page", async () => {
    const server = SetupExpressServer(repositories, encryptor)
    const { body, status } = await supertest(server.getApp()).get("/login")

    expect(status).toEqual(200)
  })
})
