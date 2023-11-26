const bcrypt = require("bcryptjs");
const Item = require("../models/item");
const image = require("../utils/image");

async function getItems(req, res) {
  try {
    const { active } = req.query;
    let response = null;

    if (active === undefined) {
      response = await Item.find();
    } else {
      response = await Item.find({ Active });
    }

    res.status(200).send(response);
  } catch (error) {
    console.error("Error al obtener los items:", error);
    res.status(500).send({ msg: "Error interno del servidor" });
  }
}

async function createItem(req, res) {
  try {
    const item = new Item({ ...req.body, Active: false, Showcase: false , Photo:null});


    const itemStored = await item.save();
    console.log("Se ha creado el item", item);
    res.status(201).send(itemStored);
  } catch (error) {
    console.error("Error al crear el item:", error);
    res.status(400).send({ msg: "Error al crear el item" });
  }
}

async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const itemData = req.body;
    console.log("req.body",req.body);
    console.log("req.files",req.files);
    console.log("req.files.Photo",req.files.Photo);

    if (req.files?.Photo !== undefined) {
      const imagePath = image.getFilePath(req.files.Photo);
      console.log("IMAGEPATH DESPUES DEL REQFILES------>", imagePath);
      itemData.Photo = imagePath;
    }else{
      console.log(".PHOTO ES UNDEFINED");
    }
    

    await Item.findByIdAndUpdate({ _id: id }, itemData).exec();
    console.log("item actualizado", itemData);
    res.status(200).send({ msg: "Actualizacion correcta" });
  } catch (error) {
    console.log("Error al actualizar el item:", error);
    console.error("Error al actualizar el item:", error);
    res.status(400).send({ msg: "Error al actualizar el item" });
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.params;

    await Item.findByIdAndDelete(id).exec();
    res.status(200).send({ msg: "item eliminado" });
  } catch (error) {
    console.error("Error al eliminar el item:", error);
    res.status(400).send({ msg: "Error al eliminar el item" });
  }
}

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
