"use strict";

const userHelper = require("../lib/util/user-helper")

const express = require('express');
const userController = express.Router();

module.exports = function (DataHelpers) {

    userController.get("/", function (req, res) {
        //res.send("HELLO TESTING REGISTER PAGE TO BE IMPLEMENTED");
        res.render("/users.html"); 
        //res.redirect("../")
    })

    userController.post("/", function (req, res) {
        if (!req.body.email || !req.body.password || !req.body.username) {
            console.log("HEADER 1")
            res.status(400).send('Please enter an email, username, and password.');
            return;
        }

        //to do: add cookies session 
        //to do: password needs to be hashed
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const newUser = {
            email: email,
            password: password,
            username: username,
        }


        DataHelpers.getUsers((err, users) => {
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === email) {
                    console.log('user has already registered')
                    console.log("HEADER 2")
                    //res.send(400).send("USER ALREADY EXISTS!");
                } 
            }
            
        });

        DataHelpers.saveUser(newUser, (err) => {
            if (err) {
                console.log("HEADER 3")
                res.status(500).json({
                    error: err.message
                });
            } else {
                //res.status(201).send()
                console.log("HEADER 4")
                res.redirect('../')
            }
        })
    })


    return userController;

}