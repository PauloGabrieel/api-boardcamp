import { Router } from "express";

import { createCustomer } from "../controllers/customerControllers.js";

const route = Router();

route.post('/customers', createCustomer);

export default route;