import express from "express";
const app = express();
import { configDotenv } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Connection from "./Config/DBConn.js";
import Router from "./Routes/PortFolioRoutes.js";
import cors from "cors";
configDotenv();

const Port = process.env.PORT || 5100;
app.use(express.json());
// app.use(cors());


const allowedOrigins = [
  "https://my-world-x66a.onrender.com", // your frontend on Render
  "http://localhost:5174" // for local testing
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


Connection();

app.use("/api/MyWorld/", Router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve React build (adjust folder name if needed)
app.use(express.static(path.join(__dirname, "./FrontEnd/dist")));

// ✅ Catch-all for React Router
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "./FrontEnd/dist/index.html"));
});


app.listen(Port, () => console.log(`Listening from the Port ${Port}`));
