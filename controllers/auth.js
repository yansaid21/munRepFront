const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");
const axios = require("axios");
const emailer = require("../utils/emailer")
const smsmailer = require ("../utils/smsService")

/* Función que permite el registro de un usuario nuevo en el sistema */
const register = async (req, res) => {
  const { firstname, lastname, email, password,document,documentType, departamento, municipio } = req.body;
  if (!email) return res.status(400).send({ msg: "El email es requerido" });
  if (!password) return res.status(400).send({ msg: "La contraseña es requerida" });
  if (!document) return res.status(400).send({ msg: "El documento es requerido" });

  const response = await axios.get("https://www.datos.gov.co/resource/xdk5-pm3f.json");
  const data = response.data;
  const generateRandomCode = () => Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
const verifyCode = generateRandomCode();

const Mun = data.filter(registro => registro.municipio === municipio);
const Dep = data.filter(registro => registro.departamento === departamento);

    if (Dep.length === 0) return res.status(400).send({ msg: "El Departamento no se encuentra" });

    if (Mun.length === 0) return res.status(400).send({ msg: "El Munuipio no se encuentra" });
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
        password: hashPassword,
        document,
        documentType,
        departamento,
        municipio,
        verifyCode,
    });

  try {
    const userStorage = await user.save();
    res.status(201).send(userStorage);
    emailer.EmailSend(verifyCode, email.toLowerCase());
    smsmailer.smsSend(verifyCode, email.toLowerCase())
  } catch (error) {
    console.log("error al intentar guardar", error);
    res.status(400).send({ msg: "Error al crear el usuario" +error});
  }
};


/* Función que permite iniciar sesión */

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!password) {
      throw new Error("la contraseña es obligatoria");
      //console.log("la contraseña es obligatoria");
    }
    if(!email){
      throw new Error("El email es obligatorio");
      //console.log("El email es obligatorio");

    
    }
    const emailLowerCase = email.toLowerCase();
    const userStore = await User.findOne({ email: emailLowerCase }).exec();
    if (!userStore) {
      throw new Error("El usuario no existe");
      //console.log("El usuario");
      
    }
    const check = await bcrypt.compare(password, userStore.password);
    if (!check) {
      throw new Error("Contraseña incorrecta");
      //console.log("contraseña incorrecta");

    }
    if (!userStore.active) {
      throw new Error("Usuario no autorizado o no activo");
      //console.log("Usuario no autorizado o no activo");

    }
    res.status(200).send({
      access: jwt.createAccessToken(userStore),
      refresh: jwt.createRefreshToken(userStore),
    });
  } catch (error) {
    console.log("error en el login", error);

    res.status(400).send({ msg: error.message });
  }
};


async function refreshAccessToken(req, res) {
  const { token } = req.body;
  if (!token) return res.status(400).send({ msg: "Token requerido" });
  try {
    const { user_id } = jwt.decoded(token);
    const userStorage = await User.findOne({ _id: user_id }).exec();
    if (!userStorage) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }
    res.status(200).send({
      accessToken: jwt.createAccessToken(userStorage),
    });
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}


module.exports = {
  register,
  login,
  refreshAccessToken,
};
