const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET to db (get team data from team table)
router.get('/', (req, res) => {
    const sqlText=`SELECT * FROM "teams" join players on teams.id = players.team_id;`;
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
  const sqlText=`select teams.team_name, teams.about_us, players.id, players.team_id, teams.logo, teams.id
  from teams join players on teams.id = players.team_id where players.user_id = $1;`;
  const values = [req.params.id];
  pool.query(sqlText, values)
    .then( (response) => {
      res.send(response.rows[0]);
    })
    .catch( (error) => {
      console.log(`Error getting your teams data`, error);
      res.sendStatus(500);
    })
})


module.exports = router;
