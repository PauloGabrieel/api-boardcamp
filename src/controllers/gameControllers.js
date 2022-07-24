import connection from "../database/postgres.js";
import { gameValidation } from "../schemas/gameSchema.js";

export async function getGames(req, res){
    try {
        
    } catch (error) {
        console.log(error);
    }
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
    }
};
