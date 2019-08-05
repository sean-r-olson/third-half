const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET to db (get players data from players table)
router.get('/', (req, res) => {
    const sqlText=`SELECT * FROM "players" ORDER BY "team_id"`;
    pool.query(sqlText)
      .then( (response) => {
        res.send(response.rows);
      })
      .catch( (error) => {
        console.log(`Error getting shows`, error);
        res.sendStatus(500);
      })
})

module.exports = router;
