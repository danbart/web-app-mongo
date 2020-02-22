const express = require('express');
const path = require('path')

// Initializations
const app = express();

// Settings
// Configuración de puerto
app.set('port', process.env.PORT || 4000);
// Configuracion de la carpeta views se usa pat para que se reconozca en windows
app.set('views', path.join(__dirname + 'views'));

// Middlewares
// para decirle al servidor que procese los datos en json
app.use(express.urlencoded({ extended: false }));


// Global Variables

// Routes
app.get('/', (req, res) => {
    res.send('hello word');
})

// Static Files
// son archivos que cualquier cliente puede usar
// esto le dice a node esta es la carpeta public
app.use(express.static(path.join(__dirname + 'public')));

module.exports = app;