
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const connectwithDB = () => {
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( () => console.log("EdTech application is connected with database succefully"))
    .catch( (err) => {
        console.log("DataBase connection Failure, Recheck it again");
        console.error(err);
        process.exit(1);
    })
}

module.exports = connectwithDB;