const bcrypt = require("bcryptjs");
const User = require("../models/user");
const image = require("../utils/image");

async function getMe(req, res) {
  try {
    const { user_id } = req.user;
    console.log("user id del getMe", user_id);
    
    const response = await User.findById(user_id);
    console.log("usuario encontrado: ", response);

    if (!response) {
      return res.status(400).send({ msg: "No se ha encontrado usuario" });
    }

    res.status(200).send(response);
    console.log("respuesta enviada:", response);
  } catch (error) {
    console.error("Error al obtener el usuario actual:", error);
    res.status(500).send({ msg: "Error interno del servidor" });
  }
}

async function getUsers(req, res) {
  try {
    const { active } = req.query;
    let response = null;

    if (active === undefined) {
      response = await User.find();
    } else {
      response = await User.find({ active });
    }

    res.status(200).send(response);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send({ msg: "Error interno del servidor" });
  }
}

async function createUser(req, res) {
  try {
    const { password } = req.body;
    const user = new User({ ...req.body, active: false });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    user.password = hashedPassword;

    /*   if (req.files.avatar) {
      const imagePath = image.getFilePath(req.files.avatar);
      user.avatar = imagePath;
    } */

    const userStored = await user.save();
    res.status(201).send(userStored);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(400).send({ msg: "Error al crear el usuario" });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const userData = req.body;

    if (userData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(userData.password, salt);
      userData.password = hashedPassword;
    } else {
      delete userData.password;
    }

    /*   if (req.files.avatar) {
      const imagePath = image.getFilePath(req.files.avatar);
      userData.avatar = imagePath;
    } */

    await User.findByIdAndUpdate({ _id: id }, userData).exec();
    /* console.log("usuario actualizado", userData); */
    res.status(200).send({ msg: "Actualizacion correcta" });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(400).send({ msg: "Error al actualizar el usuario" });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id).exec();
    res.status(200).send({ msg: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(400).send({ msg: "Error al eliminar el usuario" });
  }
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
