import connection from "../database/postgres.js";

export async function getCategories(req, res){

    const categories = await connection.query('SELECT * FROM categories');
    res.send(categories.rows)

};

