import { Router } from "express";

import { createCustomer, getCustomers, getCustomersById } from "../controllers/customerControllers.js";

const route = Router();

route.post('/customers', createCustomer);
route.get('/customers', getCustomers);
route.get('/customers/:id',getCustomersById);

export default route;