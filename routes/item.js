const express = require("express");
const multiparty = require("connect-multiparty");
const ItemController = require("../controllers/item");
const md_auth = require("../middlewares/authenticated");
const md_upload = multiparty({ uploadDir: "./uploads/item" });
const api = express.Router();

api.get("/items", ItemController.getItems);
api.post("/item", [md_auth.ensureAuth, md_upload], ItemController.createItem);
api.patch(
  "/item/:id",
  [md_auth.ensureAuth, md_upload],
  ItemController.updateItem
);
api.delete("/item/:id", [md_auth.ensureAuth], ItemController.deleteItem);

module.exports = api;
