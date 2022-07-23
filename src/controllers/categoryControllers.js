import connection from "../database/postgres.js";

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
        await connection.query(`INSERT INTO categories(name) VALUES ('${name}');`);
        res.status(201).send('Cadastrado com sucesso');
    
    } catch (error) {
        res.status(500).send('Houve um error ao tentar cadastrar um categoria no banco de dados!');
        console.log(error);        
    }
    
}
