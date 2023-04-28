var express = require('express');
var router = express.Router();
const New = require("../models/New");
var login = require('./login');

router.get("/", (req,res) => {
    New.find((error,data) => {
        if(error){
            console.log(error);
            res.send([]);
        }else{
            const news = [];
            const orderData = data;
            orderData.sort((a, b) => (a.fecha < b.fecha) ? 1 : -1)

            for(let i=0; i<orderData.length; i++){
                let item = {id:i, _id:orderData[i]._id, title:orderData[i].titulo, fecha:orderData[i].fecha, content:orderData[i].contenido, doc:orderData[i].documento};
                news.push(item);
            }

            
            res.send(news);
        }
    })
})

router.post("/", (req,res) => {
    let user = login.getLoggedAdmin();

    if(user!=""){
        const title = req.body.title;
        const doc = req.body.doc;
        const fecha = req.body.fecha;
        const content = req.body.content;

        if(typeof title!=='undefined' && typeof fecha!=='undefined'){
            let newNew = new New({titulo:title, fecha:fecha, contenido:content, documento:doc, idUserCreador:user});

            newNew.save((error, data) => {
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

router.put("/:id", (req,res) => {
    let user = login.getLoggedAdmin();
    let newID = req.params.id;

    if(user!=""){
        const title = req.body.title;
        const doc = req.body.doc;
        const fecha = req.body.fecha;
        const content = req.body.content;

        if(typeof title!=='undefined' && typeof fecha!=='undefined'){
            let update = {titulo:title, fecha:fecha, contenido:content, documento:doc};
            let filter = {_id:newID};

            New.findOneAndUpdate(filter, {$set:update}, {new: true}, (err,doc) => {
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
    let newID = req.params.id;

    if(user!=""){
        New.deleteOne({_id:newID}, (error, data) => {
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