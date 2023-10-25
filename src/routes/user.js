const express = require("express");
const UserController = require("../controllers/user");
const api = express.Router();

//api.get("/user/me", UserController.getMe);
api.get("/users", UserController.getUsers);
api.post("/user", UserController.createUser);
api.patch(
    "/user/:id",UserController.updateUser
);
api.delete("/user/:id", UserController.deleteUser);

module.exports = api;
