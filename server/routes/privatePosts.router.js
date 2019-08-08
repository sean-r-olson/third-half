const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET to db (get team data from team table)
router.get('/', (req, res) => {
    const sqlText=`select "username", "message", "date_time" from "private_posts";
    `;
    pool.query(sqlText)
      .then( (response) => {
        res.send(response.rows);
        console.log(response.rows);
      })
      .catch( (error) => {
        console.log(`Error getting shows`, error);
        res.sendStatus(500);
      })
})

router.post('/', (req, res) => {
    const sqlText=`INSERT INTO "private_posts"("username", "message", "date_time") VALUES($1, $2, clock_timestamp());`;
    const values = [req.body.username, req.body.message];
    console.log(req.body.message)
    pool.query(sqlText, values)
    .then((results)=> {
      res.sendStatus(201);
      console.log(values)
    }).catch((error) => {
      console.log('error with insert into private posts', error);
      res.sendStatus(500);
    })
})

module.exports = router;
