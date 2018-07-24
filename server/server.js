require('./config/config');
const express = require('express')

const app = express()
const port = process.env.PORT;

const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/usuarios', function(req, res) {
    res.json('Hello World')
})

app.post('/usuario', function(req, res) {
    const body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            status: "Error",
            mensaje: "Es necesario que agregue el campo nombre",
            err: "Formulario no completo"
        })
    } else {
        res.json({
            usuario: body
        })

    }
})

app.put('/usuario/:id', function(req, res) {
    const id = req.params.id;
    res.json({ id })
})

app.delete('/usuario/:id', function(req, res) {
    const id = req.params.id;
    res.json({ id })
})


app.listen(port, () => {
    console.log(`Escuchando en el puerto ${ port }`);
})