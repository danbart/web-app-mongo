const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Initializations
const app = express();
require('./config/passport');

// Settings
// Configuración de puerto
app.set('port', process.env.PORT || 4000);
// Configuracion de la carpeta views se usa pat para que se reconozca en windows
app.set('views', path.join(__dirname, 'views'));
// para definir nuestro sistema de plantillas 
app.engine('.hbs', exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
// le decimos a node cual es el uso de plantillas
app.set('view engine', '.hbs');

// Middlewares
// para decirle al servidor que procese los datos en json
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
// esto sirve para controlar los metodos que se envian desde el formulario
app.use(methodOverride('_method'));
//  estos metodos es para crear las sesiones 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// esto sirve para enviar mensajes entre las vistas
app.use(flash());


// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

// Static Files
// son archivos que cualquier cliente puede usar
// esto le dice a node esta es la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;