var express = require('express');
var router = express.Router();
const User = require("../models/User");
var roles = require('./roles');

router.post("/admin", async (req,res) => {
    const username = req.body.username;
    const pass = req.body.pass;
    const rolAdmin = await roles.getRol("administrador");
    console.log(rolAdmin);

    User.findOne({username:username,pass:pass,idRol:rolAdmin._id}, (error,check) => {
        if(check){
            res.send(true);
        }else{
            console.log(error);
            res.send(false); //EMAIL Y CONTRASEÑA INVÁLIDAS
        }
    });
})

module.exports = {router:router}