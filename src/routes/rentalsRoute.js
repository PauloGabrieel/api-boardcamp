import { Router } from "express";
import { createRental, getRentals } from "../controllers/rentalControllers.js";

const route = Router();

route.post('/rentals', createRental);
route.get('/rentals',getRentals)

export default route;