var express = require('express');
var router = express.Router();
const New = require("../models/New");

/* const user = [
    {
        titulo: "AYUDAS PARA LA ADQUISICIÓN DE LIBROS DE TEXTO, MATERIAL ESCOLAR Y TRANSPORTE  ESCOLAR CURSO",
        fecha: new Date(2022,8,30),
        contenido: "Podrá solicitar esta subvención el alumnado del municipio de Carrocera matriculado en determinados centros educativos y que cumpla los requisitos establecidos.\nPlazo de presentación de solicitudes:hasta el 27 de septiembre de 2022.",
        documento: "https://drive.google.com/file/d/1NiAshk4_2znjMVjrlZg6LDKkSBZ-lHRS/view?usp=sharing",
        idUserCreador: "644835c8ca00d2bbf222a9ab",
    }
];

function start(){
//IF THE 2 DEFAULT USERS ARE NOT LOADED INTO THE DATABASE, WE LOAD THEM
    let newUser = new New(user[0]);
    newUser.save((error) => {
        if(error){
        console.log(error);
        }
    });
}
start(); */

module.exports = {router:router}