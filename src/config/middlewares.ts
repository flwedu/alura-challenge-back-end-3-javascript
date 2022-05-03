import Express, { Application } from "express"
import session from "express-session"

export default (app: Application): void => {
  app.use(
    session({
      secret: process.env.SECRET || "secret",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1200000 },
    })
  )
  app.use(Express.json())
  app.use(Express.urlencoded({ extended: true }))
  app.use(Express.static("public"))
}
