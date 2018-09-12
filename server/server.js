require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
console.log(process.env.URLDB);
mongoose.connect(process.env.URLDB, (e, r) => {
    if (e) throw e;
    console.log('Base de datos ONLINE');
});

const app = express();
const port = process.env.PORT;

const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Configuracion global de rutas
app.use(require('./routes/index'));

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${ port }`);
})