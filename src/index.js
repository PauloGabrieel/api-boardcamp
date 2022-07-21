import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import categoriesRoute from ".//routes/categoriesRoute.js"; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(categoriesRoute);

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log("Server running");
});