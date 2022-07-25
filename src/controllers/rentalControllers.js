import connection from "../database/postgres.js";

export async function createRental(req,res){
    try {
        
        const rent = req.body;
        console.log(rent);
        const customerId = await connection.query(`SELECT id FROM customers WHERE id='${rent.customerId}'`)
        if(!customerId.rows[0]){
            return res.sendStatus(400);
        };
        const game = await connection.query(`SELECT * FROM games WHERE id='${rent.gameId}'`);
        if(!game.rows[0]){
            return res.sendStatus(400);
        };
        if(rent.daysRented <= 0){
            return res.sendStatus(400);
        };

        const rentPrice = game.rows[0].pricePerDay * rent.daysRented; 
        await connection.query(`INSERT INTO rentals("customerId", "gameId", "rentDate", "daysRented","returnDate", "originalPrice", "delayFee")
                            VALUES ('${rent.customerId}', '${rent.gameId}',CURRENT_DATE ,'${rent.daysRented}',NULL, '${rentPrice}', NULL )
        `);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send('deu ruim');   
    }
};

export async function getRentals(req,res){
    try {
        const data = await connection.query(`SELECT rentals.*, row_to_json(customers) AS customer, row_to_json(games) AS game 
        FROM rentals JOIN customers ON rentals."customerId"=customers.id JOIN games ON rentals."gameId"=games.id;`);
        res.send(data.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send("deu ruim");
    }
}