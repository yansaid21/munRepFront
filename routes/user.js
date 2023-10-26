const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/authenticated");
const md_upload = multiparty({ uploadDir: "./uploads/avatar" });
const api = express.Router();

api.get("/user/me", [md_auth.ensureAuth], UserController.getMe);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.post("/user", [md_auth.ensureAuth, md_upload], UserController.createUser);
api.patch(
  "/user/:id",
  [md_auth.ensureAuth, md_upload],
  UserController.updateUser
);
api.delete("/user/:id", [md_auth.ensureAuth], UserController.deleteUser);

module.exports = api;
