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
}