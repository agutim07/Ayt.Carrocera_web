const express = require('express')
const app = express()
const mysql = require('mysql')
const bcrypt = require("bcryptjs")
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createPool({
    host: 'PMYSQL149.dns-servicio.com',
    user: 'carrocera',
    password: 'P2404200d',
    database: '9472537_aytcarrocera'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

/* app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method"
    );
    if (req.method === "OPTIONS") {
    return res.status(200).end();
    }
    next();
}); */

app.get("/", (req,res) => {
    const sqlInsert = "INSERT INTO news (title, doc, content, fecha) VALUES ('AYUDA PARA ESTUDIANTES','/Publicación_Bando_BANDO SUBVENCIÓN MATERIAL ESCOLAR 2022_2023.pdf','Podrá solicitar esta subvención el alumnado del municipio de Carrocera matriculado en determinados centros educativos y que cumpla los requisitos establecidos.','2022-10-09');";
    db.query(sqlInsert, (err, result) => {
        res.send("hello");
    })
});

app.post("/api/login", (req,res) => {
    const username = req.body.username;
    const pass = req.body.pass;
    const sqlSelect = 'SELECT * FROM users WHERE username=?';
    db.query(sqlSelect, [username], (err,result) => {
        if(result.length==0){
            res.send(false);
        }else{
            let passHash = result[0].pass;
            bcrypt.compare(pass, passHash, (err, coinciden) => {
                if(coinciden){
                    res.send(true);
                }else{
                    res.send(false);
                }
            });
        }
    });
})

app.post("/api/register", (req,res) => {
    const username = req.body.username;
    const pass = req.body.pass;
    const sqlInsert = "INSERT INTO users (username, pass) VALUES (?,?);";
    bcrypt.hash(pass,10, (err,passCrypt) => {
        db.query(sqlInsert, [username,passCrypt], (err, result) => {
            console.log(result);
        })
    })
});

app.listen(3001, () => {
    console.log("running on port 3001");
});