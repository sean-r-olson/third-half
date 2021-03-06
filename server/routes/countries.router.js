const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET to db (get all country info from countries table)
router.get('/', (req, res) => {
    const sqlText=`SELECT * FROM "countries"`;
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
