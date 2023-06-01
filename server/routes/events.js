var express = require('express');
var router = express.Router();
const Event = require("../models/Event");
var pueblos = require('./pueblos');
var login = require('./login');
const users = require('./users');

router.get("/", (req,res) => {
    let user = login.getLoggedUser();
    let admin = login.getLoggedAdmin();

    Event.find(async (error,data) => {
        if(error){
            console.log(error);
            res.send([]);
        }else{
            const events = [];
            const orderData = data;
            orderData.sort((a, b) => (a.fecha > b.fecha) ? 1 : -1);

            for(let i=0; i<orderData.length; i++){
                const pueblo = await pueblos.getPueblo(orderData[i].idPueblo);

                var itsIn = false;
                if(user!="" && orderData[i].apuntados.includes(user)){itsIn=true;}

                var apuntados = [];
                if(orderData[i].inscripcion && admin!=""){apuntados = await getApuntados(orderData[i]._id);}

                let item = {id:i, _id:orderData[i]._id, title:orderData[i].titulo, fecha:orderData[i].fecha, content:orderData[i].contenido, doc:orderData[i].documento, loc:pueblo, inscripcion:orderData[i].inscripcion, itsIn:itsIn, apuntados:apuntados};
                events.push(item);
            }

            res.send(events);
        }
    })
})

router.post("/", async (req,res) => {
    let user = login.getLoggedAdmin();

    if(user!=""){
        const title = req.body.title;
        const doc = req.body.doc;
        const fecha = req.body.fecha;
        const content = req.body.content;
        const loc = req.body.loc;
        const inscripcion = req.body.inscripcion;
        const pueblo = await pueblos.getPuebloID(loc);

        if(typeof title!=='undefined' && typeof fecha!=='undefined' && pueblo!=null){
            let newEvent = new Event({titulo:title, fecha:fecha, contenido:content, documento:doc, idPueblo:pueblo, inscripcion:inscripcion});

            newEvent.save((error, data) => {
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
    }else{
        res.send(false);
    }  
})

router.put("/:id", async (req,res) => {
    let user = login.getLoggedAdmin();
    let eventID = req.params.id;

    if(user!=""){
        const title = req.body.title;
        const doc = req.body.doc;
        const fecha = req.body.fecha;
        const content = req.body.content;
        const loc = req.body.loc;
        const inscripcion = req.body.inscripcion;
        const pueblo = await pueblos.getPuebloID(loc);

        if(typeof title!=='undefined' && typeof fecha!=='undefined'){
            let update = {titulo:title, fecha:fecha, contenido:content, documento:doc, idPueblo:pueblo, inscripcion:inscripcion};
            let filter = {_id:eventID};

            Event.findOneAndUpdate(filter, {$set:update}, {new: true}, (err,doc) => {
                if(err){
                    console.log(err);
                    res.send(false);
                }else{
                    res.send(true);
                }
            })
        }else{
            res.send(false);
        }
    }else{
        res.send(false);
    }
})

router.put("/apuntar/:id", async (req,res) => {
    let user = login.getLoggedAdmin();
    let user2 = login.getLoggedUser();
    let eventID = req.params.id;

    if(user!="" || user2!=""){
        const event = await Event.findOne({_id:eventID});
        var apuntados = event.apuntados;
        if(apuntados.includes(user2)){
            const index = apuntados.indexOf(user2);
            apuntados.splice(index,1);
        }else{
            apuntados.push(user2);
        }
        
        let update = {apuntados:apuntados};
        let filter = {_id:eventID};

        Event.findOneAndUpdate(filter, {$set:update}, {new: true}, (err,doc) => {
            if(err){
                console.log(err);
                res.send(false);
            }else{
                res.send(true);
            }
        })
    }else{
        res.send(false);
    }
})

router.delete("/desapuntar/:id/:id2", async (req,res) => {
    let user = login.getLoggedAdmin();
    let eventID = req.params.id;
    let userID = req.params.id2;

    if(user!=""){
        const event = await Event.findOne({_id:eventID});
        var apuntados = event.apuntados;
        if(apuntados.includes(userID)){
            const index = apuntados.indexOf(userID);
            apuntados.splice(index,1);
        }

        let update = {apuntados:apuntados};
        let filter = {_id:eventID};

        Event.findOneAndUpdate(filter, {$set:update}, {new: true}, (err,doc) => {
            if(err){
                console.log(err);
                res.send(false);
            }else{
                res.send(true);
            }
        })
    }else{
        res.send(false);
    }
})

router.delete("/:id", (req,res) => {
    let user = login.getLoggedAdmin();
    let eventID = req.params.id;

    if(user!=""){
        Event.deleteOne({_id:eventID}, (error, data) => {
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

async function getApuntados(eventID){
    const event = await Event.findOne({_id:eventID});
    var users = [];
    for(let i=0; i<event.apuntados.length; i++){
        let us = await getUsername(event.apuntados[i]);
        if(us!=null){users.push({nombre:us,id:event.apuntados[i]});}
    }
    return users;
}

async function getUsername(user){
    let us = await users.getUser(user);
    if(us==null){return null;}

    return us.nombre + " " + us.apellidos;
}

module.exports = {router:router}