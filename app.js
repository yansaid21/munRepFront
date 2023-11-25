const express = require("express");
const cors = require("cors");
const { API_VERSION } = require("./config");
const app = express();
/* Cargar rutas */
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/item");

/* Trabajar con la extensión client-rest */
app.use(express.json());
/* Pruebas de request utilizando postman */
app.use(express.urlencoded({ extended: true }));

/* Evitar bloqueos en el navegador cuando estemos trabajando con
el backend y el front end a la vez */
app.use(cors());
console.log(`api/${API_VERSION}/`);
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, itemRoutes);

module.exports = app;
