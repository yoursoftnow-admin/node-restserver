const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValido = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        require: [true, "El correo es necesario"]
    },
    password: {
        type: String,
        require: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String,
        require: false
    },
    role: {
        type: String,
        deafult: 'USER_ROLE',
        enum: rolesValido
    },
    estado: {
        type: Boolean,
        deafult: true
    },
    google: {
        type: Boolean,
        deafult: false
    }

});


usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })


module.exports = mongoose.model('Usuario', usuarioSchema);