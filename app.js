import express from "express";
import livrosRoute from "./routes/livrosRoute.js";
import livros from "./data/livros.json";
import morgan from "morgan";
import path from "path";

const PORTA = 3000;
const server = express();

const criarUrl = (version, path) => `/api/${version}/${path}`;
const LIVROS_URL = criarUrl("v1", "livros");

server.set("views", path.join("views"));
server.set("view engine", "ejs");

server.use(morgan("tiny"));

server.use("/static", express.static("public"));

server.use(express.json());

server.use(LIVROS_URL, livrosRoute);

server.get("/", (req, res) => {
    res.render("index", {
        livros: livros
    });
});

server.get("/download/images/:imageName", (req, res) => {
    res.download(path.join("public", "images", req.params.imageName));
});

server.get("/manipulando-rota", (req, res, next) => {
    res.send("aprender route handler é legal");
    next();
}, (req, res, next) => {
    console.log("segundo handler");
    next();
}, (req, res) => {
    console.log("terceiro handler");
});

server.listen(3000, () => {
    console.log(`servidor rodando na porta ${PORTA}`);
});