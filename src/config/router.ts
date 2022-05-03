import { RepositoriesSource } from "@src/output/repositories/RepositoriesSource"
import { IEncryptor } from "@src/security/IEncryptor"
import { Application, Router } from "express"
import { readdirSync } from "fs"

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
