var express = require('express');
var router = express.Router();
const User = require("../models/User");
var roles = require('./roles');
var login = require('./login');

router.get("/", async (req,res) => {
    const rolNormal = await roles.getRol("normal");
    const rolEmpadronado = await roles.getRol("empadronado");
    
    User.find({$or:[{idRol:rolNormal._id},{idRol:rolEmpadronado._id}]}, async (error,data) => {
        if(error){
            console.log(error);
            res.send([]);
        }else{
            const users = [];

            for(let i=0; i<data.length; i++){
                let rol = "normal";
                if(data[i].idRol.equals(rolEmpadronado._id)){rol="empadronado";}

                let item = {id:i, _id:data[i]._id, username: data[i].username, pass: data[i].pass, nombre:data[i].nombre, apellidos:data[i].apellidos, dni:data[i].dni, fechaNac:data[i].fechaNac, sexo:data[i].sexo, rol:rol};
                users.push(item);
            }

            res.send(users);
        }
    })
})

router.get("/one", async (req,res) => {
    const id = login.getLoggedUser();
    if(id!=""){
        User.findOne({_id:id}, async (error,data) => {
            if(error) {
                res.send(null);
            } else {
                res.send(data);
            }
        })
    }else{
        res.send(null);
    }
})

router.put("/:id", async (req,res) => {
    let user = login.getLoggedAdmin();
    let user2 = login.getLoggedUser(); 
    let userID = req.params.id;

    if(user!="" || user2 == userID){
        const pass = req.body.pass;
        const name = req.body.nombre;
        const surname = req.body.apellidos;
        const date = req.body.fecha;
        const sex = req.body.sexo;

        let update = {pass: pass, nombre:name, apellidos:surname, fechaNac:date, sexo:sex};
        let filter = {_id:userID};

        User.findOneAndUpdate(filter, {$set:update}, {new: true}, (err,doc) => {
            if(err){
                console.log(err);
                res.send(false);
            }else{
                res.send(true);
            }
        })
    }
})

router.delete("/:id", (req,res) => {
    let user = login.getLoggedAdmin();
    let userID = req.params.id;

    if(user!=""){
        User.deleteOne({_id:userID}, (error, data) => {
            if(error){
                console.log(error);
                res.send(false);
            }else{
                res.send(true);
            }
        })
    }else{
        res.send(false);
    }
    
})

module.exports = {router:router}