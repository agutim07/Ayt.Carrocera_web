var express = require('express');
var router = express.Router();
const Event = require("../models/Event");
var pueblos = require('./pueblos');

router.get("/", (req,res) => {
    Event.find(async (error,data) => {
        if(error){
            console.log(error);
            res.send([]);
        }else{
            const events = [];

            for(let i=0; i<data.length; i++){
                const pueblo = await pueblos.getPueblo(data[i].idPueblo);
                let item = {id:i, title:data[i].titulo, fecha:data[i].fecha, content:data[i].contenido, doc:data[i].documento, loc:pueblo};
                events.push(item);
            }

            res.send(events);
        }
    })
})

module.exports = {router:router}