
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectwithDB = () => {
    console.log("mongo url", process.env.DB_URL);

    mongoose.connect(process.env.DB_URL, {
        family: 4
    })
    .then(() => console.log("EdTech application is connected with database successfully"))
    .catch((err) => {
        console.log("DataBase connection Failure, Recheck it again");
        console.error(err);
        process.exit(1);
    });
};

module.exports = connectwithDB;