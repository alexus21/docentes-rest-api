import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import cors from "cors";
import {apiKeyMiddleware} from "./middleware/apiKeyMiddleware.js";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use("/api", routes);

app.get("/", apiKeyMiddleware, function (req, res) {
    return res.send("Bienvenido a la API REST de Docentes");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
