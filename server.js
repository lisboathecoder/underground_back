import express from "express";
import dotenv from "dotenv";
import artistasRoutes from "./src/routes/artistasRoutes.js";

const app = express();
app.use(express.json());

dotenv.config
const serverPort = process.env.PORT || 3001;

app.get("/", (req,res) => {
    res.send("Server on G's");
})

// Routes
app.use("/artistas", artistasRoutes);

app.listen(serverPort, () => {
    console.log(`Yo, the Server is open, access in: http://localhost:${serverPort} 🥷🏿`);
})