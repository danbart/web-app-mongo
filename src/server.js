const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')

// Initializations
const app = express();

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


// Global Variables

// Routes
app.use(require('./routes/index.routes'));

// Static Files
// son archivos que cualquier cliente puede usar
// esto le dice a node esta es la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;