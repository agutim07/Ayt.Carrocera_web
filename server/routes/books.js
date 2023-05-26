var express = require('express');
var router = express.Router();
const Library = require("../models/Library");
const Book = require("../models/Book");
const User = require("../models/User");
var pueblos = require('./pueblos');
var login = require('./login');

router.get("/", async (req,res) => {
    let user = login.getLoggedAdmin();

    if(user!=""){
        let biblioteca = await getBibliotecaID(user);

        Book.find({idBiblioteca:biblioteca}, async (error,data) => {
            if(error){
                console.log(error);
                res.send([]);
            }else{
                const books = [];

                for(let i=0; i<data.length; i++){
                    let bookUser = "admin";
                    if(data[i].idUserAlquiler!=null){
                        bookUser = await getBookUser(data[i].idUserAlquiler);
                    }
                    let item = {id:i, _id:data[i]._id, titulo:data[i].titulo, autor:data[i].autor, fecha:data[i].fecha, disponibilidad:data[i].disponibilidad, ISBN:data[i].ISBN, user:bookUser};
                    books.push(item);
                }

                res.send(books);
            }
        })
    }else{
        res.send(false);
    }
})

router.post("/", async (req,res) => {
    let user = login.getLoggedAdmin();

    if(user!=""){
        let biblioteca = await getBibliotecaID(user);

        const titulo = req.body.titulo;
        const ISBN = req.body.ISBN;
        const autor = req.body.autor;
        const fecha = req.body.fecha;

        let newBook = new Book({ISBN:ISBN, titulo:titulo, autor:autor, fecha:fecha, idBiblioteca:biblioteca});

        newBook.save((error, data) => {
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

router.put("/:id", async (req,res) => {
    let user = login.getLoggedAdmin();
    let bookID = req.params.id;

    if(user!=""){
        const titulo = req.body.titulo;
        const ISBN = req.body.ISBN;
        const autor = req.body.autor;
        const fecha = req.body.fecha;

        let update = {titulo:titulo, ISBN:ISBN, autor:autor, fecha:fecha};
        let filter = {_id:bookID};

        Book.findOneAndUpdate(filter, {$set:update}, {new: true}, (err,doc) => {
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
    let bookID = req.params.id;

    if(user!=""){
        Book.deleteOne({_id:bookID}, (error, data) => {
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

router.put("/reserva/:id", async (req,res) => {
    let user = login.getLoggedAdmin();
    let bookID = req.params.id;
    let book = await Book.findOne({_id:bookID});

    if(user!="" && book!=null){
        const disp = !book.disponibilidad;
        const user = null;

        let update = {disponibilidad:disp, idUserAlquiler:user};
        let filter = {_id:bookID};

        Book.findOneAndUpdate(filter, {$set:update}, {new: true}, (err,doc) => {
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

router.get("/library", async (req,res) => {
    let user = login.getLoggedAdmin();
    if(user!=""){
        let name = await getBibliotecaName(user);
        res.send(name);
    }else{
        res.send("false");
    }
})

async function getBookUser(user){
    let us = await User.findOne({_id:user});
    if(us==null){
        return "admin";
    }

    return us.nombre + " " + us.apellidos;
}

async function getBibliotecaID(user){
    let bib = await Library.findOne({idUserEncargado:user});

    return bib._id;
}

async function getBibliotecaName(user){
    let bib = await Library.findOne({idUserEncargado:user});
    if(bib==null){
        return "false";
    }

    return bib.nombre;
}

/* router.post("/", async (req,res) => {
    let user = login.getLoggedAdmin();

    if(user!=""){
        const name = req.body.name;
        const addr = req.body.addr;
        const userID = req.body.user;
        const loc = req.body.loc;
        const pueblo = await pueblos.getPuebloID(loc);

        let newLib = new Library({nombre:name, direccion:addr, idUserEncargado:userID, idPueblo:pueblo});

        newLib.save((error, data) => {
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
}) */

module.exports = {router:router}