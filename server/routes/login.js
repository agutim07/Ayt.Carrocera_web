var express = require('express');
var router = express.Router();
const User = require("../models/User");
var roles = require('./roles');
var adminUserId = ""

router.post("/admin", async (req,res) => {
    const username = req.body.username;
    const pass = req.body.pass;
    const rolAdmin = await roles.getRol("administrador");

    User.findOne({username:username,pass:pass,idRol:rolAdmin._id}, (error,check) => {
        if(check){
            adminUserId = check._id;
            res.send(true);
        }else{
            console.log(error);
            res.send(false); //EMAIL Y CONTRASEÑA INVÁLIDAS
        }
    });
})

function getLoggedAdmin(){
    return adminUserId;
}

module.exports = {router:router, getLoggedAdmin:getLoggedAdmin}