const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET to db (get players data from players table)
router.get('/userTeam/:id', (req, res) => {
    const sqlText=`select * from players where team_id=$1;`;
    const values = [req.params.id];
    pool.query(sqlText, values)
      .then( (response) => {
        res.send(response.rows);
      })
      .catch( (error) => {
        console.log(`Error getting shows`, error);
        res.sendStatus(500);
      })
})

// GET to db (get logged in user's player info for profile page)
router.get('/user/:id', (req, res) => {
  let playerId = req.params.id;
  const sqlText = `select players.id, players.player_name, players."position", players.picture, teams.team_name from players join teams on players.team_id = teams.id where players.user_id=$1;
  `;
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

// GET to db (get clicked team's player info)
router.get('/clickedTeam/:id', (req, res) => {
  let clickedId = req.params.id;
  const sqlText = `select * from players where team_id=$1;`;
  const values = [clickedId];
  pool.query(sqlText, values)
  .then((response) => {
    res.send(response.rows);
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('error getting single player data from DB', error);
    res.sendStatus(500);
  })
})

// PUT to db (FOR ADMIN_LEVEL 1 - edit player info (name/position))
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

// PUT to db (edit LOGGED IN USER's player info (profile page))
router.put('/editProfile/:id', (req, res) => {
  const sqlText = `update "players" set "player_name"=$1, "position"=$2 where "user_id"=$3`;
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

// DELETE to db (delete user's player info)
router.delete('/delete/:id', (req, res) => {
  const sqlText = `delete from players where user_id=$1;`;
  const values = [req.params.id];
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
