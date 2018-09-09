//=====================================
//  PORT
//====================================

process.env.PORT = process.env.PORT || 82;

//=====================================
//  ENTORNO
//====================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=====================================
//  BASE DE DATOS
//====================================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://cafe-user:Cafe2100@ds251002.mlab.com:51002/cafe';
}

// console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'dev', urlDB);
process.env.URLDB = urlDB;