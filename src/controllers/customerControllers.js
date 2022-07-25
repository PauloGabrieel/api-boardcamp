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
        
    }


    
}