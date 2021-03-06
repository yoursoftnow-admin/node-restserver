const jwt = require('jsonwebtoken');

// ========================================
// Verificar token
// ========================================

let verificarToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: "Token no válido"
                    }
                })
            }

            req.usuario = decoded.usuario;
            next();
        })
        // res.json({
        //     token
        // })

}


// ========================================
// Verificar ADMIN_ROLE
// ========================================

let verificarAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    // console.log(req.usuario);
    // let usuario = req.usuario;
    if (usuario.role === "ADMIN_ROLE") {
        next();


    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: "El usuario no es administrador"
            }
        })
    }


};

module.exports = {
    verificarToken,
    verificarAdmin_Role
}