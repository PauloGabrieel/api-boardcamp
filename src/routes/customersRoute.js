import { Router } from "express";

import { createCustomer, getCustomers } from "../controllers/customerControllers.js";

const route = Router();

route.post('/customers', createCustomer);
route.get('/customers', getCustomers);

export default route;