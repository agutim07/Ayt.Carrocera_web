var express = require('express');
var router = express.Router();
const Pueblo = require("../models/Pueblo");

async function getPueblo(id){
    let pueblo = await Pueblo.findOne({_id:id});

    return pueblo.nombre;
}

async function getPuebloID(loc){
    let pueblo = await Pueblo.findOne({nombre:loc});

    return pueblo._id;
}

module.exports = {router:router, getPueblo:getPueblo, getPuebloID:getPuebloID}