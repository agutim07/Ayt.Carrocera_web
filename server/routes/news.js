var express = require('express');
var router = express.Router();
const New = require("../models/New");

router.get("/", (req,res) => {
    New.find((error,data) => {
        if(error){
            console.log(error);
        }else{
            res.send(data);
        }
    })
})

module.exports = {router:router}