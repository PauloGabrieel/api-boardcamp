import connection from "../database/postgres.js";
import { gameValidation } from "../schemas/gameSchema.js";

export async function getGames(req, res){
    try {
        const {name} = req.query;   
        if(name){
            const nameUpperCase = name[0].toUpperCase() + name.substring(1);
            const gamesAvailable = await connection.query(`
                SELECT g.*, c.name as "categoryName"
                FROM games g JOIN categories c
                ON g."categoryId"=c.id WHERE g.name LIKE '${nameUpperCase+"%"}';
            `);
            return res.status(200).send(gamesAvailable.rows);
        };
        const gamesAvailable = await connection.query(`
            SELECT g.*,c.name as "categoryName" 
            FROM games g JOIN categories c 
            ON g."categoryId"=c.id;
        `);
        res.status(200).send(gamesAvailable.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Houve algum erro ao buscar os jogos no banco de dados');
    };
};
export async function creategame(req,res){
    try {
        const game = req.body;
        const validation = gameValidation(game);
        if(validation.error){
            const {details} = validation.error;
            return res.status(400).send(details);
        };
        const {rows: id } = await connection.query(`SELECT id FROM categories WHERE  id='${game.categoryId}';`);
        if(id.length === 0){
            return res.status(400).send('categoryId inexistente');
        };
        const {rows: name} = await connection.query(`SELECT name FROM games WHERE name='${game.name}'`)
        console.log(name);
        if(name.length === 1){
            return res.status(409).send('Jogo já existente');
        }
        await connection.query(`INSERT INTO games(name, image,"stockTotal","categoryId", "pricePerDay")
                                VALUES('${game.name}','${game.image}','${game.stockTotal}','${game.categoryId}','${game.pricePerDay}');        
        `);
        res.status(201).send('jogo cadastrado');  
    } catch (error) {
        console.log(error);
        res.status(500);
    };
};
