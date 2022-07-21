import connection from "../database/postgres.js";

async function getCategories(req, res){

    const categories = await connection.query('SELECT * FROM categories');
    console.log(categories);

};

export default {getCategories};