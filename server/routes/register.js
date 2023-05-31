var express = require('express');
var router = express.Router();
const User = require("../models/User");
var roles = require('./roles');
const xlsx = require('xlsx'); 
var adminUserId = ""
var censo = []

router.post("/", async (req,res) => {
    const username = req.body.usuario;
    const pass = req.body.contrasena;
    const name = req.body.nombre;
    const surname = req.body.apellidos;
    const signature = req.body.dni;
    const date = req.body.fecha;
    const sex = req.body.sexo;

    if(censo.length==0){censo = await getCenso();}
    var rol = null;
    var roltipo = "";
    if(censo.includes(signature)){
        rol = await roles.getRol("empadronado");
        roltipo = "empadronado";
    }else{
        rol = await roles.getRol("normal");
        roltipo = "normal";
    }

    if(typeof username!=='undefined' && typeof signature!=='undefined') {
        User.findOne({$or:[{dni:signature},{username:username}]}, (error,check) => {
            if(check){
                res.send("false");
            }else{
                let newUser = new User({username: username, pass: pass, nombre:name, apellidos:surname,dni:signature, fechaNac:date, sexo:sex, idRol:rol._id});
                newUser.save((error, data) => {
                    if(error){
                        console.log(error);
                        res.send("false");
                    }else{
                        res.send(roltipo);
                    }
                })
            }
        });
    }else{
        res.send("false");
    }
})

async function getCenso(){
    var data = [];

    const workbook = xlsx.readFile("./data/censo.xlsx");  
    let workbook_sheet = workbook.SheetNames;                
    let workbook_response = xlsx.utils.sheet_to_json(        
      workbook.Sheets[workbook_sheet[0]]
    );

    for(var i in workbook_response){
        var str = JSON.stringify(workbook_response[i]);
        dni = str.replace("{\"DNI\":\"", '');
        dni = dni.replace("\"}", '');
        data.push(dni);
    }
    
    return data;
}

module.exports = {router:router}