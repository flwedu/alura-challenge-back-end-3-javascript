import { Application, Router } from "express"
import { readdirSync } from "fs"
import { RepositoriesSource } from "../output/repositories/RepositoriesSource"
import { IEncryptor } from "../security/IEncryptor"

export default (
  app: Application,
  repositories: RepositoriesSource,
  encryptor: IEncryptor
): void => {
  const router = Router()

  app.use("/", router)

  readdirSync(`${__dirname}/../routes`).map(async (file) => {
    if (!file.includes(".test.")) {
      ;(await import(`../routes/${file}`)).default(
        router,
        repositories,
        encryptor
      )
    }
  })
}
