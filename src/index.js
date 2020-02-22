// sirve para leer y crear variables de entorno en archivos .env
require('dotenv').config();
const app = require('./server');
require('./database');

// Process es para acceder al sistema env es nuestra variable de entorno
// console.log(process.env.TESTING);

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})