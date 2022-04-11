import Express from "express";

const app = Express();

app.get("/", (req, res) => {
    res.send("Hello world");
})


export { app };