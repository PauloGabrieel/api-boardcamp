import connection from "../database/postgres.js";
import { categoryValidation } from "../schemas/categorySchema.js";

export async function getCategories(req, res){
    try {
        const categories = await connection.query('SELECT * FROM categories');
        res.status(200).send(categories.rows);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Houve um erro no servidor');
    }
    
};
export async function createCategory(req, res){
    const {name} = req.body;
   try {
        const validation =  await categoryValidation(name);
        if(validation.error){
            return res.status(400).send("nome da categoria é obrigatório");
        };
        
        const categoryAlreadyExists = await connection.query(`SELECT name FROM categories WHERE name='${name}';`);
        if(categoryAlreadyExists.rows){
         return res.status(409).send('Categoria já existente');   
        };
        
        await connection.query(`INSERT INTO categories(name) VALUES ('${name}');`);
        res.status(201).send('Cadastrado com sucesso');
    
    } catch (error) {
        res.status(500).send('Houve um error ao tentar cadastrar um categoria no banco de dados!');
        console.log(error);        
    }
    
};
