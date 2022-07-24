import { Router } from "express";
import { getGames,creategame } from "../controllers/gameControllers.js";

const route = Router();

route.get("/games", getGames);
route.post("/games", creategame);

export default route;