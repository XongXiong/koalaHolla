
var express = require('express');
var router = express.Router();
var koalas = []; // <- Stored on the SERVER

var pg = require('pg');
var config = {
  database: 'deneb', // the name of the database
  host: 'localhost', // where is your database?
  port: 5432, // the port number for you database, 5432 is the default
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // Close idle connections to db after
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  // Attempt to connect to the database
  pool.connect(function(errorConnectingToDb, db, done) {
    if(errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      var queryText = 'SELECT * FROM "koalas";';
      db.query(queryText, function(errorMakingQuery, result){
        // We have received an error or result at this point
        done(); // pool +1
        if(errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      }); // END QUERY
    }
  }); // END POOL
}); // END GET ROUTE

router.post('/', function(req, res){
  var koala = req.body; // This the data we sent
  console.log(koala); // Has a name and cost
  // Attempt to connect to the database
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      var queryText = 'INSERT INTO "koalas" ("name", "age", "gender", "ready", "notes") VALUES ($1, $2, $3, $4, $5);';
      db.query(queryText, [koala.name, koala.age, koala.gender, koala.readyForTransfer, koala.notes], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          // Send back success!
          res.sendStatus(201);
        }
      }); // END QUERY
    }
  }); // END POOL
});

router.delete('/:id', function(req, res){
  var koalaId = req.params.id;
  console.log(koalaId);
  // res.sendStatus(200);
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      var queryText = 'DELETE FROM "koalas" WHERE "id"=$1';
      db.query(queryText, [koalaId], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          // Send back success!
          res.sendStatus(201);
        }
      }); // END QUERY
    }
  }); // END POOL
});

router.put('/:id', function(req,res){
  var koalaId = req.params.id;
  console.log(koalaId);
  //res.sendStatus(200);
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      // There was an error and no connection was made
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      var queryText = 'UPDATE "koalas" SET "ready" = \'true\' WHERE "id" = $1;';
      db.query(queryText, [koalaId], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          // Send back success!
          res.sendStatus(201);
        }
      }); // END QUERY
    }
  }); // END POOL
});

module.exports = router;
