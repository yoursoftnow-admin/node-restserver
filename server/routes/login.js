const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req, res) => {


    let body = req.body;
    // console.log(body);
    Usuario.findOne({ email: body.email }, (err, usDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }


        if (!bcrypt.compareSync(body.password, usDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }
        let token = jwt.sign({
                usuario: usDB
            },
            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        res.json({
            ok: true,
            usuario: usDB,
            token
        });
    });

});


module.exports = app;