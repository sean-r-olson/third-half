const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET to db (get team data from team table)
router.get('/', (req, res) => {
    const sqlText=`SELECT * FROM "messages"`;
    pool.query(sqlText)
      .then( (response) => {
        res.send(response.rows);
      })
      .catch( (error) => {
        console.log(`Error getting shows`, error);
        res.sendStatus(500);
      })
})

router.post('/', (req, res) => {
  const sqlText=`insert into messages ("from_id", "recieved_id", "date_time", "message", "from_name", "recieved_name")
  values ($1, $2, clock_timestamp(), $3, $4, $5);`;
  const values = [req.body.from_id, req.body.recieved_id, req.body.message, req.body.from_name, req.body.recieved_name];
  console.log(req.body)
  pool.query(sqlText, values)
    .then((results)=> {
      res.sendStatus(201);
    }) .catch((error) => {
      console.log('error sending message to DB', error);
      res.sendStatus(500);
    })
})

// router.post('/', (req, res) => {
//   const sqlText=`INSERT INTO "private_posts"("username", "message", "team_id", "date_time") VALUES($1, $2, $3, clock_timestamp());`;
//   const values = [req.body.username, req.body.message, req.body.team_id];
//   console.log(req.body)
//   pool.query(sqlText, values)
//   .then((results)=> {
//     res.sendStatus(201);
//     console.log(values)
//   }).catch((error) => {
//     console.log('error with insert into private posts', error);
//     res.sendStatus(500);
//   })
// })


module.exports = router;
