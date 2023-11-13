const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:{
        type:String,
        unique:true,
    },
    DocumentType:String,
    document:{
        type:String,
        unique:true,
    },
    password:String,
    role:String,
    active:Boolean,
    avatar:String,
    departamento: String,
    municipio: String,
    verifyCode: String,
});

module.exports = mongoose.model("User",UserSchema);
