import { Router } from "express";
import {getCategories} from "../controllers/categoryControllers.js";

const route = Router();

route.get("/categories", getCategories);


export default route;