const express = require('express');
const expressValidator = require('express-validator');
const routes = require('./routes');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

//Importar variables de entorno
require('dotenv').config({path: 'variables.env'})




//const bp = require("body-parser"); !ya esta enbebido en express

//Helpers con algunas funciones
const helpers = require('./helpers');

//crear la conexion a la DB
const db = require('./config/db');


//Importar modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

//crear una app de express
const app = express();

//Donde cargar los archivos staticos
app.use(express.static('public'));

//inicializamos View Engine con template pug
app.set('view engine', 'pug');

// Habilitar bodyParser para leer datos de formularios
app.use(express.urlencoded({ extended: true }));


// Agregamos express validator a toda la aplicación
app.use(expressValidator());

//añadimos el path de las vistas
app.set('views', path.join(__dirname, './views'));

 
app.use(cookieParser());

// sesiones nos permite navegar entre pagias sin volver a autenticar
app.use(session({
    secret: 'keyboard cat',
    reseve: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// agregar flash messages
app.use(flash());

//Pasar var dump a la aplicacion
app.use((req, res, next) => {
        res.locals.vardump = helpers.vardump;
        res.locals.mensajes = req.flash();
        res.locals.usuario = {...req.user} || null;
        next(); 
});
 
app.use('/', routes());


//Servidor y Puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '3000';

app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});
 