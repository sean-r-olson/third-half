const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET to db (get private messages of logged in user's belonged team)
router.get('/:id', (req, res) => {
    const sqlText=
    `select username, message, to_char(date_time, 'Mon DD, YYYY HH:MI') from private_posts where team_id=$1 order by to_char desc;`;
    const values = [req.params.id];
    console.log(values);
    pool.query(sqlText, values)
      .then( (response) => {
        res.send(response.rows);
        console.log(response.rows);
      })
      .catch( (error) => {
        console.log(`Error getting shows`, error);
        res.sendStatus(500);
      })
})

// INSERT into db (add private post w/ username, message, etc)
router.post('/', (req, res) => {
    const sqlText=`INSERT INTO "private_posts"("username", "message", "team_id", "date_time") VALUES($1, $2, $3, clock_timestamp());`;
    const values = [req.body.username, req.body.message, req.body.team_id];
    console.log(req.body)
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
