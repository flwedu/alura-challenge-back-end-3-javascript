import "dotenv/config";
import Express, { Router } from "express";
import session from "express-session";

const app = Express();

const configureExpressApp = (routes?: Router) => {

    // Set view engine to ejs
    app.set("view engine", "ejs");

    // Middlewares
    app.use(session({
        secret: process.env.SECRET || "secret",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1200000 },
    }))
    app.use(Express.json());
    app.use(Express.urlencoded({ extended: true }));
    app.use(Express.static("public"));
    if (routes) app.use("/", routes);

    return app;
}

export { configureExpressApp };
