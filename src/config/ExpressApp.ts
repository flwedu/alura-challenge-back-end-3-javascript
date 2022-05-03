import { RepositoriesSource } from "@src/output/repositories/RepositoriesSource"
import { IEncryptor } from "@src/security/IEncryptor"
import "dotenv/config"
import express from "express"
import setupMiddlewares from "./middlewares"
import setupRouter from "./router"

const SetupExpressServer = (
  repositories: RepositoriesSource,
  encryptor: IEncryptor
) => {
  const app = express()

  // Engines
  app.set("view engine", "ejs")

  // Middlewares
  setupMiddlewares(app)

  // Routes
  setupRouter(app, repositories, encryptor)

  return {
    getApp: () => {
      return app
    },

    start: (port = 3000) => {
      app.listen(() => {
        console.log("Server listening on port: " + port)
      })
    },
  }
}

export default SetupExpressServer
