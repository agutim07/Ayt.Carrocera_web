var express = require('express');
var router = express.Router();
const User = require("../models/User");
var roles = require('./roles');
var adminUserId = ""

router.post("/", async (req,res) => {
    const username = req.body.usuario;
    const pass = req.body.contrasena;
    const name = req.body.nombre;
    const surname = req.body.apellidos;
    const signature = req.body.dni;
    const date = req.body.fecha;
    const sex = req.body.sexo;
    const rol = await roles.getRol("normal");

    if(typeof username!=='undefined' && typeof signature!=='undefined') {
        User.findOne({$or:[{dni:signature},{username:username}]}, (error,check) => {
            if(check){
                res.send(false);
            }else{
                let newUser = new User({username: username, pass: pass, nombre:name, apellidos:surname,dni:signature, fechaNac:date, sexo:sex, idRol:rol._id});
                newUser.save((error, data) => {
                    if(error){
                        console.log(error);
                        res.send(false);
                    }else{
                        res.send(true);
                    }
                })
            }
        });
    }else{
        res.send(false);
    }
})

module.exports = {router:router}