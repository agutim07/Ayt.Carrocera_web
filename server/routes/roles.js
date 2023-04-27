var express = require('express');
var router = express.Router();
const Rol = require("../models/Rol");

async function getRol(tipo){
    let rol = await Rol.findOne({tipoRol:tipo});

    return rol;
}

module.exports = {router:router, getRol:getRol}