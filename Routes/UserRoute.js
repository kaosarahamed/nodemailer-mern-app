const express = require("express");
const Router = express.Router();
const {getUser, register} = require("../Controller/UserController");

Router.get("/", getUser);
Router.post("/", register);


module.exports = Router;