const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET to db (get players data from players table)
router.get('/', (req, res) => {
    const sqlText=`select * from players where team_id=1;`;
    pool.query(sqlText)
      .then( (response) => {
        res.send(response.rows);
      })
      .catch( (error) => {
        console.log(`Error getting shows`, error);
        res.sendStatus(500);
      })
})

router.get('/:id', (req, res) => {
  let playerId = req.params.id;
  const sqlText = `select id, position from players where id=$1;`;
  const values = [playerId];
  pool.query(sqlText, values)
  .then((response) => {
    res.send(response.rows[0]);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('error getting single player data from DB', error);
    res.sendStatus(500);
  })
})

router.get('/user/:id', (req, res) => {
  let playerId = req.params.id;
  const sqlText = `select id, player_name, position, picture from players where user_id=$1;`;
  const values = [playerId];
  pool.query(sqlText, values)
  .then((response) => {
    res.send(response.rows[0]);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('error getting single player data from DB', error);
    res.sendStatus(500);
  })
})

router.put('/edit/:id', (req, res) => {
  const sqlText = `update "players" set "player_name"=$1, "position"=$2 where "id"=$3`;
  const values = [req.body.player_name, req.body.position, req.params.id];
  pool.query(sqlText, values)
  .then((response) => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('error updating player data for DB', error);
    res.sendStatus(500);
  })
})

module.exports = router;
