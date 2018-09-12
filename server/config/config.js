//=====================================
//  PORT
//====================================

process.env.PORT = process.env.PORT || 82;

//=====================================
//  ENTORNO
//====================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=====================================
//  Vencimiento del token
//====================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//=====================================
//  SEED de autenticacion | Local y en heroku 
//====================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//=====================================
//  BASE DE DATOS
//====================================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

// console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'dev', urlDB);
process.env.URLDB = urlDB;