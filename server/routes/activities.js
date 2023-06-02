var express = require('express');
var router = express.Router();
const Activity = require("../models/Activity");
const Reserva = require("../models/Reserva");
var pueblos = require('./pueblos');
var login = require('./login');
const users = require('./users');

router.get("/", (req,res) => {
    Activity.find(async (error,data) => {
        if(error){
            console.log(error);
            res.send([]);
        }else{
            const acts = [];

            for(let i=0; i<data.length; i++){
                const pueblo = await pueblos.getPueblo(data[i].idPueblo);
                let item = {id:i, _id:data[i]._id, name:data[i].nombre, addr:data[i].direccion, price:data[i].precio_hr, exclusive:data[i].exclusivo, habilitada:data[i].habilitada, open:data[i].apertura, close:data[i].cierre, loc:pueblo};
                acts.push(item);
            }

            res.send(acts);
        }
    })
})

router.get("/reservas", (req,res) => {
    let user = login.getLoggedUser();

    Reserva.find(async (error,data0) => {
        if(error){
            console.log(error);
            res.send([]);
        }else{
            var datos = [];
            const data = data0;
            data.sort((a, b) => (a.fechaInicio > b.fechaInicio) ? 1 : -1);

            for(let i=0; i<data.length; i++){
                let mine = false;
                if(data[i].idUsuario.equals(user)){mine = true;}
                let nombre = await getUsername(data[i].idUsuario);
                let item = {id:i,_id:data[i]._id,fechaInicio:data[i].fechaInicio,fechaFin:data[i].fechaFin,tiempoHoras:data[i].tiempoHoras,precioTotal:data[i].precioTotal,idActividad:data[i].idActividad,mine:mine,nombre:nombre};
                datos.push(item);
            }

            res.send(datos);
        }
    })
})

router.post("/", async (req,res) => {
    let user = login.getLoggedAdmin();

    if(user!=""){
        const name = req.body.name;
        const addr = req.body.addr;
        const price = req.body.price;
        const exclusive = req.body.exclusive;
        const open = req.body.open;
        const close = req.body.close;
        const loc = req.body.loc;
        const pueblo = await pueblos.getPuebloID(loc);

        if(typeof name!=='undefined' && typeof addr!=='undefined' && typeof price!=='undefined' && pueblo!=null){
            let newAct = new Activity({nombre:name, direccion:addr, precio_hr:price, exclusivo:exclusive, apertura:open, cierre:close, idPueblo:pueblo});

            newAct.save((error, data) => {
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
    let activityID = req.params.id;

    if(user!=""){
        const price = req.body.price;
        const exclusive = req.body.exclusive;
        const open = req.body.open;
        const close = req.body.close;
        const habilitada = req.body.habilitada;

        if(typeof price!=='undefined'){
            let update = {precio_hr:price, exclusivo:exclusive, apertura:open, cierre:close, habilitada:habilitada};
            let filter = {_id:activityID};

            Activity.findOneAndUpdate(filter, {$set:update}, {new: true}, (err,doc) => {
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

router.post("/reserva/:id", async (req,res) => {
    let user = login.getLoggedUser();
    let activityID = req.params.id;

    if(user!="" || activityID==null){
        const fechaInicio = req.body.inicio;
        const fechaFin = req.body.fin;
        const tiempoHoras = req.body.horas;
        const precioTotal = req.body.precio;
        const idActividad = activityID;
        const idUsuario = user;

        let newRes = new Reserva({fechaInicio:fechaInicio, fechaFin:fechaFin, tiempoHoras:tiempoHoras, precioTotal:precioTotal, idActividad:idActividad, idUsuario:idUsuario});

        newRes.save((error, data) => {
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

router.delete("/reserva/:id", (req,res) => {
    let user = login.getLoggedUser();
    let user2 = login.getLoggedAdmin();
    let reservaID = req.params.id;

    if(user!="" || user2!=""){
        Reserva.deleteOne({_id:reservaID}, (error, data) => {
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

async function getUsername(user){
    let us = await users.getUser(user);
    if(us==null){return null;}

    return us.nombre + " " + us.apellidos;
}

module.exports = {router:router}