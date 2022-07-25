import { Router } from "express";
import { createRental } from "../controllers/rentalControllers.js";

const route = Router();

route.post('/rentals', createRental);

export default route;