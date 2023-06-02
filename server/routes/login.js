var express = require('express');
var router = express.Router();
const User = require("../models/User");
var roles = require('./roles');
var adminUserId = ""
var userId = ""

router.post("/admin", async (req,res) => {
    const username = req.body.username;
    const pass = req.body.pass;
    const rolAdmin = await roles.getRol("administrador");

    User.findOne({username:username,pass:pass,idRol:rolAdmin._id}, (error,check) => {
        if(check){
            userId = "";
            adminUserId = check._id;
            res.send(true);
        }else{
            console.log(error);
            res.send(false); //EMAIL Y CONTRASEÑA INVÁLIDAS
        }
    });
})

router.post("/user", async (req,res) => {
    const username = req.body.username;
    const pass = req.body.pass;
    const rolNormal = await roles.getRol("normal");
    const rolEmpadronado = await roles.getRol("empadronado");

    User.findOne({username:username,pass:pass,$or:[{idRol:rolNormal._id},{idRol:rolEmpadronado._id}]}, (error,check) => {
        if(check){
            userId = check._id;
            adminUserId = "";
            res.send(true);
            console.log("Usuario logueado");
        }else{
            console.log(error);
            res.send(false); //EMAIL Y CONTRASEÑA INVÁLIDAS
        }
    });
})

router.put("/logout", async (req,res) => {
    userId="";
    res.send(true);
})

router.get("/", async (req,res) => {
    const user = userId;
    if(user==""){
        res.send("false");
    }else{
        const us = await User.findOne({_id:user});
        const rolNormal = await roles.getRol("normal");
        if((us.idRol).equals(rolNormal._id)){
            res.send("normal");
        }else{
            res.send("empadronado");
        }
    }
})

function getLoggedAdmin(){
    return adminUserId;
}

function getLoggedUser(){
    return userId;
}

module.exports = {router:router, getLoggedAdmin:getLoggedAdmin, getLoggedUser:getLoggedUser}