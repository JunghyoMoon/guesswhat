import { join } from "path";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

const handleListening = () => {
  console.log(`😎 Listening on port ${PORT}!!`);
};

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => res.render("home"));

app.listen(PORT, handleListening);
