import connection from "../database/postgres.js";
import { customerValidation } from "../schemas/custumerSchema.js";

export async function createCustomer(req, res){
    try {
        const customer = req.body;
        const validation = customerValidation(customer);
        if(validation.error){
            const {details} = validation.error;
            return res.status(400).send(details);
        };
        const {rows: cpf} = await connection.query(`SELECT cpf FROM customers WHERE cpf='${customer.cpf}'`)
        console.log(cpf);
        if(cpf.length === 1){
            return res.status(409).send('cpf já existente');
        };
        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) 
                                VALUES ('${customer.name}','${customer.phone}', '${customer.cpf}','${customer.birthday}');
        `);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send('Houve um erro na criação do cliente');
    };
};

export async function getCustomers(req, res){
    try {
        const {cpf} = req.query
        if(cpf){
            const customer = await connection.query(`SELECT * FROM customers WHERE cpf LIKE '${cpf+"%"}';`);
            return res.status(200).send(customer.rows);
        };
        
        const customers = await connection.query('SELECT * FROM customers;');
        res.status(200).send(customers.rows);    
    } catch (error) {
        console.log(error);
        res.status(500).send('Houve um problema para buscar os clientes');   
    };
};

export async function getCustomersById(req, res){
    try {
        const {id} = req.params;
        const customer = await connection.query(`SELECT * FROM customers WHERE id='${id}'`);
        const existingCustomer = customer.rows.length !== 0;
    
        if(!existingCustomer){
            return res.status(404).send('Cliente não existe');
        };
        res.status(200).send(customer.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Houve um problema para buscar o cliente');
    }
};