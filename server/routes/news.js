var express = require('express');
var router = express.Router();
const New = require("../models/New");

router.get("/", (req,res) => {
    New.find((error,data) => {
        if(error){
            console.log(error);
            res.send([]);
        }else{
            const news = [];

            for(let i=0; i<data.length; i++){
                let item = {id:i, title:data[i].titulo, fecha:data[i].fecha, content:data[i].contenido, doc:data[i].documento};
                news.push(item);
            }

            res.send(news);
        }
    })
})

module.exports = {router:router}