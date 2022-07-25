import { Router } from "express";

import { createCustomer, getCustomers, getCustomersById, updateCustomerById } from "../controllers/customerControllers.js";

const route = Router();

route.post('/customers', createCustomer);
route.get('/customers', getCustomers);
route.get('/customers/:id',getCustomersById);
route.put('/customers/:id',updateCustomerById)

export default route;