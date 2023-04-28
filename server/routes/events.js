var express = require('express');
var router = express.Router();
const Event = require("../models/Event");
var pueblos = require('./pueblos');
var login = require('./login');

router.get("/", (req,res) => {
    Event.find(async (error,data) => {
        if(error){
            console.log(error);
            res.send([]);
        }else{
            const events = [];
            const orderData = data;
            orderData.sort((a, b) => (a.fecha < b.fecha) ? 1 : -1);

            for(let i=0; i<orderData.length; i++){
                const pueblo = await pueblos.getPueblo(orderData[i].idPueblo);
                let item = {id:i, _id:orderData[i]._id, title:orderData[i].titulo, fecha:orderData[i].fecha, content:orderData[i].contenido, doc:orderData[i].documento, loc:pueblo};
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
        const pueblo = await pueblos.getPuebloID(loc);

        if(typeof title!=='undefined' && typeof fecha!=='undefined' && pueblo!=null){
            let newEvent = new Event({titulo:title, fecha:fecha, contenido:content, documento:doc, idPueblo:pueblo, inscripcion:false});

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
        const pueblo = await pueblos.getPuebloID(loc);

        if(typeof title!=='undefined' && typeof fecha!=='undefined'){
            let update = {titulo:title, fecha:fecha, contenido:content, documento:doc, idPueblo:pueblo};
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

module.exports = {router:router}