import express from "express";
const app = express();
import { configDotenv } from "dotenv";
import Connection from "./Config/DBConn.js";
import Router from "./Routes/PortFolioRoutes.js";
import cors from "cors";
configDotenv();

const Port = process.env.PORT || 5100;
app.use(express.json());
app.use(cors());

Connection();

app.use("/api/MyWorld/", Router);

app.listen(Port, () => console.log(`Listening from the Port ${Port}`));
