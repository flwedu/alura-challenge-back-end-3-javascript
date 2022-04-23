import cookieParser from "cookie-parser";
import "dotenv/config";
import Express, { Router } from "express";
import session from "express-session";

const app = Express();

const configureExpressApp = (routes?: Router) => {

    // Set view engine to ejs
    app.set("view engine", "ejs");

    // Middlewares
    app.use(session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, maxAge: 1200000 }
    }))
    app.use(Express.json());
    app.use(Express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(Express.static("public"));
    if (routes) app.use("/", routes);

    return app;
}

export { configureExpressApp };
