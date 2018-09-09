const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            })
        });
});

app.post('/usuario', function(req, res) {
    const body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usDB
        });
    });
    // for (let index = 13; index < 56; index++) {
    //     let usuario = new Usuario({
    //         nombre: 'Test ' + index,
    //         email: `test${index}@yoursoftnow.com`,
    //         password: bcrypt.hashSync('123456', 10),
    //         role: 'USER_ROLE'
    //     });
    //     usuario.save((err, usDB) => {
    //         if (index == 55) {
    //             res.json({
    //                 ok: true,
    //                 usuario: usDB
    //             });
    //         }

    //     });

    // }


})

app.put('/usuario/:id', function(req, res) {
    const id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usDB
        });
    })

})

app.delete('/usuario/:id', function(req, res) {
    const id = req.params.id;
    let cambiaEsado = { estado: false };

    // Usuario.findByIdAndRemove(id, (err, usDeleted) => {
    Usuario.findByIdAndUpdate(id, cambiaEsado, { new: true, runValidators: true }, (err, usDeleted) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usDeleted,
            us: Usuario
        });
    })

})


module.exports = app;