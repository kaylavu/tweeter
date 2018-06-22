"use strict";

const userHelper = require("../lib/util/user-helper")

const express = require('express');
const userController = express.Router();

module.exports = function (DataHelpers) {

    userController.get("/", function (req, res) {
        res.send("HELLO TESTING REGISTER PAGE TO BE IMPLEMENTED");
        //res.redirect("../")
    })

    userController.post("/", function (req, res) {
        if (!req.body.email || !req.body.password || !req.body.username) {
            //console.log(req.body.text)
            res.status(400).json({
                error: 'Please enter email & password'
            });
            return;
        }

        //need to add cookies
        //password needs to be hashed
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const newUser = {
            email: email,
            password: password,
            username: username,
        }

        DataHelpers.saveUser(newUser, (err) => {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                res.status(201).send()
                //res.redirect('../')
            }
        })

    })

    return userController;

}