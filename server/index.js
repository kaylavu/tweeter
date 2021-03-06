"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
//const db = require("./lib/in-memory-db");

const MongoClient = require("mongodb").MongoClient; 
const MONGODB_URI = "mongodb://localhost:27017/tweeter"; 

MongoClient.connect(MONGODB_URI, (err,client) => {
  if(err) {
    console.error(`Failed to connect: ${MONGODB_URI}`); 
    throw err; 
  }
  const db = client.db('tweeter')
  console.log(`Connected to mongodb: ${MONGODB_URI}`); 
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  const userController = require("./routes/users")(DataHelpers);
  app.use("/tweets", tweetsRoutes);
  app.use("/users",userController); 

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

  app.post("/login", function(req,res) {
    //if user exists redirect / 
    //if user doesnt exist error message 
    //cookie sessions 
    let username = req.body.email 
    let password = req.body.password; 
    console.log("Logged In")
    res.redirect("/")
  }); 

 

})



// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:


// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.


// Mount the tweets routes at the "/tweets" path prefix:



