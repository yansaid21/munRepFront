const mongoose = require("mongoose")
const app = require("./app")

const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,API_VERSION,IP_SERVER} = require("./config")

// Acceder a la configuración del archivo .env

// Acceder a variables del .env se usa process.env
const port = process.env.PORT || 3200;

//mongodb+srv://jeansariasm:countryDatabase@cluster0.zi6bc99.mongodb.net/
//mongodb+srv://jeansariasm:countryDatabase@cluster0.zi6bc99.mongodb.net/
app.listen(port, () => console.log(`Conectados por el puerto ${port}`));
console.log(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`)
console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}`);
            
mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`)
    .then(()=>console.log("Conectado a mongoDB"))
    .catch((err)=>console.error(`Error al conectar a mongoDB ${err}`));