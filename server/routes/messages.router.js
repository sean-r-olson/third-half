const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET to db (get messages w/ from/to id's, etc., from messages table)
router.get('/', (req, res) => {
    const sqlText=`select id, from_id, recieved_id, to_char(date_time, 'Mon DD, YYYY HH:MI'), message, from_name, recieved_name, new_message, team_name
     from messages order by to_char asc;`;
    pool.query(sqlText)
      .then( (response) => {
        res.send(response.rows);
      })
      .catch( (error) => {
        console.log(`Error getting shows`, error);
        res.sendStatus(500);
      })
})

// POST to db (add message)
router.post('/', (req, res) => {
  const sqlText=`insert into messages ("from_id", "recieved_id", "date_time", "message", "from_name", "recieved_name", "new_message", "team_name")
  values ($1, $2, clock_timestamp(), $3, $4, $5, $6, $7);`;
  const values = [req.body.from_id, req.body.recieved_id, req.body.message, req.body.from_name, req.body.recieved_name, req.body.new_message, req.body.team_name];
  console.log(req.body)
  pool.query(sqlText, values)
    .then((results)=> {
      res.sendStatus(201);
    }) .catch((error) => {
      console.log('error sending message to DB', error);
      res.sendStatus(500);
    })
})

// PUT to db (update message status to read)
router.put('/:id', (req, res) => {
  const sqlText=`update "messages" set "new_message"=false where id=$1;`;
  const values = [req.params.id];
  pool.query(sqlText, values)
    .then((results) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log('error updating message status', error);
      res.sendStatus(500);
    })
})

module.exports = router;
