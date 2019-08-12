const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET to db (get team data from team table)
router.get('/:id', (req, res) => {
    const sqlText=
    // select private_posts.message, "user".username, private_posts.date_time, "user".team from private_posts 
    // join "user" on private_posts.team_id = "user".team 
    // join  "teams" on "teams".id = private_posts.team_id where "user".team= $1;`
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
